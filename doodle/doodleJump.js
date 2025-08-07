var canvas = document.querySelector("canvas");
canvas.width = 800;  
canvas.height = 600; 
var graphics = canvas.getContext("2d");

var cameraY = 0; 
var highestPlatform = 0; // Track highest platform for infinitvar gameRunning = false; // Start as false until player presses a key

let gameStarted = false;


var score = 0;
var highestPoint = 0;

const doodleImgLeft = new Image();
const doodleImgRight = new Image();
let imagesLoaded = 0;

function startGame() {
    if (imagesLoaded === 2) {
        requestAnimationFrame(gameLoop);
    }
}

doodleImgLeft.onload = function() {
    imagesLoaded++;
    startGame();
};

doodleImgRight.onload = function() {
    imagesLoaded++;
    startGame();
};


doodleImgLeft.src = "Doodlejumpdorkly.webp";
doodleImgRight.src = "transparent-Photoroom.png";

var dorklyY = canvas.width / 2 - 75;
var dorklyX = canvas.height - 100;
var velocity = 0;
const GRAVITY = 0.4; 
const JUMP_FORCE = -16;
var imageorientation = doodleImgLeft;

var keyState = ['ArrowLeft', 'ArrowRight'].reduce((acc, key) => {
    acc[key] = false;
    return acc;
}, {});

var savePlatforms = [];

function gameLoop() {
    // Clear the canvas
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameStarted) {
        // Draw the starting platform
        drawPlatform(canvas.width / 2 - 75, canvas.height - 100, 150, 20);
        // Draw the character
        graphics.drawImage(imageorientation, dorklyX, dorklyY, 50, 50);
        
        // Draw start instructions
        graphics.fillStyle = 'black';
        graphics.font = 'bold 32px Arial';
        graphics.textAlign = 'center';
        graphics.fillText('Press any arrow key to start!', canvas.width / 2, canvas.height / 2);
        
        requestAnimationFrame(gameLoop);
        return;
    }
    
    if (!gameRunning) return;
    
    // Handle movement
    if (keyState['ArrowLeft']) {
        dorklyX -= 5;
        imageorientation = doodleImgLeft;
    }
    if (keyState['ArrowRight']) {
        dorklyX += 5;
        imageorientation = doodleImgRight;
    }
    
    // Apply gravity and velocity
    velocity += GRAVITY;
    dorklyY += velocity;

  
  // Update camera to follow player
    const idealCameraY = dorklyY - canvas.height * 0.6; // Keep player at 60% of screen height
    cameraY += (idealCameraY - cameraY) * 0.1;     


    // Update score based on highest point reached
    if (-dorklyY > highestPoint) {
        highestPoint = -dorklyY;
        score = Math.floor(highestPoint / 10); // Convert height to score
    }
    
    // Draw score
    graphics.fillStyle = 'black';
    graphics.font = '24px Arial';
    graphics.fillText('Score: ' + score, 45, 30);
    
    // Keep player in horizontal bounds
    if (dorklyX < 0) dorklyX = 0;
    if (dorklyX > canvas.width - 50) dorklyX = canvas.width - 50;
    
    // Draw the character (adjusted for camera position)
    graphics.drawImage(imageorientation, dorklyX, dorklyY - cameraY, 50, 50);
    
    // Create and check platform collisions 
    platform();
    
    // Keep character in bounds
    if (dorklyY > canvas.height + cameraY - 50) {
        dorklyY = canvas.height + cameraY - 50;
        velocity = 0;
    }
    
    // Check for game over
    checkGameOver();
    
    // Loop the animation
    requestAnimationFrame(gameLoop);
}

function drawPlatform(x, y, width, height) {
    graphics.fillStyle = 'green';
    graphics.beginPath();
    graphics.ellipse(x + width / 2, y + height / 2, width / 3, height / 4, 0, 0, 2 * Math.PI);
    graphics.fill();
    graphics.closePath();
}

addEventListener("keydown", function(event) {
    if (event.key in keyState) {
        if (!gameStarted && !gameOverShown) {
            gameStarted = true;
            gameRunning = true;
        }
        keyState[event.key] = true;
    }
});

addEventListener("keyup", function(event) {
    if (event.key in keyState) {
        keyState[event.key] = false;
    }
});


function platform(){
    // Generate initial platforms
    if (savePlatforms.length === 0) {
        // First platform always under starting position
        var startPlatform = {
            x: canvas.width / 2 - 75, // Centered platform (150/2 = 75)
            y: canvas.height - 100,   // Near bottom of screen
            width: 150,
            height: 20
        };
        savePlatforms.push(startPlatform);
        
        // Generate rest of the platforms
        for(let i = 1; i < 25; i++) { // Start from 1 since we already added first platform
            var oblong = {
                x: Math.floor(Math.random() * (canvas.width - 150)),
                y: i * 150, // Platforms closer together
                width: 150,
                height: 20
            };
            savePlatforms.push(oblong);
            highestPlatform = Math.min(highestPlatform, oblong.y);
        }
    }
    
    // Generate new platforms as player moves up
    while (highestPlatform > dorklyY - canvas.height * 2) { // Generate platforms ahead of player
        var newPlatform = {
            x: Math.floor(Math.random() * (canvas.width - 150)),
            y: highestPlatform - Math.random() * 100 - 50, // Random spacing between 50-150
            width: 150,
            height: 20
        };
        savePlatforms.push(newPlatform);
        highestPlatform = newPlatform.y;
    }
    
    // Remove platforms that are too far below
    savePlatforms = savePlatforms.filter(p => p.y < dorklyY + canvas.height * 2);

    // Draw and check collision for all platforms
    for (var i = 0; i < savePlatforms.length; i++) {
        var platform = savePlatforms[i];
        
        // Only draw platforms that are on screen
        if (platform.y - cameraY >= -50 && platform.y - cameraY <= canvas.height + 50) {
            graphics.fillStyle = 'green';
            graphics.beginPath();
            graphics.ellipse(platform.x + platform.width / 2, platform.y - cameraY + platform.height / 2, 
                           platform.width / 3, platform.height / 4, 0, 0, 2 * Math.PI);
            graphics.fill();
            graphics.closePath();
        }

        // Check collision only when moving downward, if hits bottom of canvas stops moving down
        if (velocity > 0 && 
            dorklyY + 50 >= platform.y && 
            dorklyY + 50 <= platform.y + platform.height && 
            dorklyX + 25 >= platform.x && 
            dorklyX + 25 <= platform.x + platform.width
        ) {
            dorklyY = platform.y - 50;
            velocity = JUMP_FORCE; // Bounce on collision
        }
    }
}


//function to restart the game
function restartGame() {
    // Reset game states
    gameOverShown = false;
    gameStarted = false;
    gameRunning = false;
    
    // Clear all game state
    savePlatforms = [];
    highestPlatform = canvas.height;
    
    // Generate new platforms (first one will be at bottom center)
    platform();
    
    // Position dorkly on the first platform
    dorklyX = canvas.width / 2 - 25; // Center horizontally
    dorklyY = canvas.height - 120;   // Just above the platform
    
    // Reset other game variables
    velocity = 0;
    cameraY = 0;
    score = 0;
    highestPoint = 0;
    gameRunning = true;
    imageorientation = doodleImgLeft;
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

//check if he hit the bottom of the screen and displays game over
let gameRunning = true;
let gameOverShown = false;

function checkGameOver() {
    // Get current height score
    let currentHeight = Math.floor(-dorklyY / 10);
    // Calculate minimum allowed score (highest score minus canvas height)
    let minimumAllowedScore = score - Math.floor(canvas.height / 10);
    
    // End game if player falls too far below their highest point
    if (currentHeight < minimumAllowedScore && !gameOverShown) {
        gameRunning = false;
        gameOverShown = true;
        saveScore(score);
        showGameOver();
    }
}

function showGameOver() {
    // Clear the canvas
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game over screen
    graphics.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent overlay
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    
    // Game Over text
    graphics.fillStyle = 'white';
    graphics.font = 'bold 48px Arial';
    graphics.textAlign = 'center';
    graphics.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
    graphics.font = 'bold 32px Arial';
    graphics.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2);
    
    // Draw restart button
    drawRestartButton();
}

function drawRestartButton() {
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = canvas.width / 2 - buttonWidth / 2;
    const buttonY = canvas.height / 2 + 50;
    
    // Draw button background
    graphics.fillStyle = '#4CAF50';
    graphics.beginPath();
    graphics.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    graphics.fill();
    
    // Draw button text
    graphics.fillStyle = 'white';
    graphics.font = 'bold 24px Arial';
    graphics.textAlign = 'center';
    graphics.fillText('Play Again', canvas.width / 2, buttonY + 33);
    
    // Add click listener for the button
    canvas.addEventListener('click', handleRestartClick);
}

function handleRestartClick(event) {
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = canvas.width / 2 - buttonWidth / 2;
    const buttonY = canvas.height / 2 + 50;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Check if click is within button bounds
    if (clickX >= buttonX && clickX <= buttonX + buttonWidth &&
        clickY >= buttonY && clickY <= buttonY + buttonHeight) {
        canvas.removeEventListener('click', handleRestartClick);
        gameRunning = true;
        restartGame();
    }
}

//send score to processScores.php

function saveScore(score) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "processScores.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Score saved successfully: " + score);
        }
    };
    xhr.send("game=doodleJump&score=" + score + "&username=" + encodeURIComponent(localStorage.getItem('username')));
}