var canvas = document.querySelector("canvas");
canvas.width = 800;  
canvas.height = 600; 
var graphics = canvas.getContext("2d");

var cameraY = 0; 
var highestPlatform = 0; // Track highest platform for infinite generation

const doodleImg = new Image();
doodleImg.src = "Doodlejumpdorkly.webp";
doodleImg.onload = function() {
    requestAnimationFrame(gameLoop);
};

var dorklyY = 100;
var dorklyX = 100;
var velocity = 0;
const GRAVITY = 0.4; // Reduced gravity
const JUMP_FORCE = -15; // Stronger jump

var keyState = ['ArrowLeft', 'ArrowRight', 'ArrowUp'].reduce((acc, key) => {
    acc[key] = false;
    return acc;
}, {});
var savePlatforms = [];

function gameLoop() {
    // Clear the canvas
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    
    // Handle movement
    if (keyState['ArrowLeft']) {
        dorklyX -= 5;
    }
    if (keyState['ArrowRight']) {
        dorklyX += 5;
    }
    
    // Apply gravity and velocity
    velocity += GRAVITY;
    dorklyY += velocity;

    // Handle jumping
    if (keyState['ArrowUp']) {
        velocity = JUMP_FORCE;
        keyState['ArrowUp'] = false; // Reset jump immediately to prevent holding
    }

    // Update camera to follow player
    const idealCameraY = dorklyY - canvas.height * 0.6; // Keep player at 60% of screen height
    cameraY += (idealCameraY - cameraY) * 0.1; // Smooth camera movement
    
    // Keep player in horizontal bounds
    if (dorklyX < 0) dorklyX = 0;
    if (dorklyX > canvas.width - 50) dorklyX = canvas.width - 50;
    
    // Draw the character (adjusted for camera position)
    graphics.drawImage(doodleImg, dorklyX, dorklyY - cameraY, 50, 50);
    
    // Create and check platform collisions (now handles camera position)
    platform();
    
    // Keep character in bounds
    if (dorklyY > canvas.height + cameraY - 50) {
        dorklyY = canvas.height + cameraY - 50;
        velocity = 0;
    }
    
    // Loop the animation
    requestAnimationFrame(gameLoop);
}

// Event listeners for controls
addEventListener("keydown", function(event) {
    if (event.key in keyState) {
        keyState[event.key] = true;
    }
});

addEventListener("keyup", function(event) {
    if (event.key in keyState) {
        keyState[event.key] = false;
    }
});


// on mous click

// acceleration = -10;
// velocity = 1;


// animate 

// if(velocity < 0){
//     velocity = velocity*acceleration
// birdY = birdY - velocity;
// velocity = velocity - 2;




function platform(){
    // Generate initial platforms
    if (savePlatforms.length === 0) {
        for(let i = 0; i < 25; i++) { // More initial platforms
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

        // Check collision only when moving downward
        if (velocity > 0 && 
            dorklyY + 50 >= platform.y && 
            dorklyY + 50 <= platform.y + platform.height && 
            dorklyX + 25 >= platform.x && 
            dorklyX + 25 <= platform.x + platform.width) {
            dorklyY = platform.y - 50;
            velocity = JUMP_FORCE; // Bounce on collision
        }
    }
}

function canvasCut(){
    // Clear the entire canvas first
graphics.clearRect(0, 0, canvas.width, canvas.height); 
graphics.drawImage(canvas, 0, 0, canvas.width / 2, canvas.height, 0, 0, canvas.width / 2, canvas.height); 

}