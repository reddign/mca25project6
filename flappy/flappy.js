let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

const pipeWidth = 30;
const pipeGap = 67.67; // Fixed gap between top and bottom pipes
const pipeSpeed = 1.5;
const FPS = 67;
const image = new Image();
image.src = "flappy-bird.png";
let birdY = 55;
var velocity = 0;
const GRAVITY = 1; 
const JUMP_FORCE = -1.67; 
let pipesArray = [];
var toppipeX=150;
var toppipeY=150;
// const intervalset = window.setInterval(FPS/1000,animate)
let lives = 1;
let score = 0;
let timesplay= 1;
let pipe1Scored= false;
let pipe2Scored= false;


image.onload = function() {
   requestAnimationFrame(animate);
};


function animate(){
     if (lives <= 0){
        window.clearInterval(intervalset)
        endscreen();
    } 
    else{
clear();
falling();
scoreBoard();
pipes();
drawbird();

    birdY += velocity;


dies();
        requestAnimationFrame(animate);
        

    }
    if (scoresent && lives<=0){
        console.log("sending score", sendingscore)
    }
    console.log("lives", lives, "score", score)   


}
function scoreBoard(){
    graphics.fillStyle = "yellow";
    graphics.font = "bold 8px 'Arial', serif";
    let scoreString = "Lives: " + lives + " Score:" + score;
    graphics.fillText(scoreString,10,10);

}

function pipes(){
        // Collision detection for both pillars
        // Bird rectangle: x=10, y=birdY, w=30, h=30
     graphics.fillStyle = "black";
      
    


    if (typeof pipeX1 === 'undefined') {
        pipeX1 = canvas.width;
       topHeight1 = Math.floor(Math.random() * (canvas.height - pipeGap - 80 )) + 20;
      bottomY1 = topHeight1 + pipeGap;
       bottomhight1 = canvas.height - bottomY1;
    }
    pipeX1 -= pipeSpeed;
    // Score for pipe 1
    if (!pipe1Scored && 10 > pipeX1 + pipeWidth) {
        score++;
        pipe1Scored = true;
    }
    if (pipeX1 + pipeWidth < 0) {
        pipeX1 = canvas.width;
        topHeight1 = Math.floor(Math.random() * (canvas.height - pipeGap - 80)) + 20;
        bottomY1 = topHeight1 + pipeGap;
        bottomhight1 = canvas.height - bottomY1;
        pipe1Scored = false;
    }

    graphics.fillStyle = "black";
    graphics.fillRect(pipeX1, 0, pipeWidth, topHeight1);
    graphics.fillRect(pipeX1, bottomY1, pipeWidth, bottomhight1);

    // Second pillar
    if (typeof pipeX2 === 'undefined') {
        pipeX2 = canvas.width + canvas.width / 2;
        topHeight2 = Math.floor(Math.random() * (canvas.height - pipeGap - 60)) + 30;
       bottomY2 = topHeight2 + pipeGap;
      bottomhight2 = canvas.height - bottomY2;
    }
    pipeX2 -= pipeSpeed;
    // Score for pipe 2
    if (!pipe2Scored && 10 > pipeX2 + pipeWidth) {
        score++;
        pipe2Scored = true;
    }
    if (pipeX2 + pipeWidth < 0) {
        pipeX2 = canvas.width;
        topHeight2 = Math.floor(Math.random() * (canvas.height - pipeGap - 60)) + 30;
        bottomY2 = topHeight2 + pipeGap;
        bottomhight2 = canvas.height - bottomY2;
        pipe2Scored = false;
    }

    graphics.fillStyle = "black";
    graphics.fillRect(pipeX2, 0, pipeWidth, topHeight2);
    graphics.fillRect(pipeX2, bottomY2, pipeWidth, bottomhight2);
}
function drawbird(){
    graphics.drawImage(image, 10, birdY, 25, 25);
}
function createPipe() {
      

  // Random height for the top pipe (between 50 and canvasHeight - pipeGap - 50)
  const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 100;

 // Bottom pipe starts after the gap
  const bottomY = topHeight + pipeGap;
  const bottomhight = canvas.height - bottomY;

graphics.fillStyle = "black";
        graphics.fillRect(150,0,pipeWidth, topHeight);
        graphics.fillRect(150,bottomY,pipeWidth, bottomhight);
        const bottomPipe = document.createElement("div");

}

function clear(){
    graphics.fillStyle =  "rgb(114, 176, 235)";
    graphics.fillRect(0,0,canvas.width,canvas.height);
}
addEventListener("click", jump);


function jump() {
    velocity = JUMP_FORCE;
}
const birdInterval = setInterval(FPS/1000,animate)
function falling(){
    velocity += GRAVITY*.05;
    
}

// function dies(){
//     if (birdY >= canvas.height || birdY <= 0 &&  10 + 30 > window.pipeX1 && 10 < window.pipeX1 + pipeWidth &&
//         (birdY < window.topHeight1 || birdY + 30 > window.bottomY1)&&10 + 30 > window.pipeX2 && 10 < window.pipeX2 + pipeWidth &&
//         (birdY < window.topHeight2 || birdY + 30 > window.bottomY2)) {
//         lives--;




//         if (lives <= 0) {
//             clearInterval(birdInterval);
//             endscreen();
//         } else {
//             birdY = 55; // Reset bird position
//         }
//     }
// }
function dies() {
    // Hit ground or ceiling
    if (birdY >= canvas.height || birdY <= 0) {
        lives--;
        if (lives <= 0) {
            clearInterval(birdInterval);
            endscreen();
        } else {
            birdY = 55;
        }
    }
    if (
    (30 > pipeX1 && 10 < pipeX1 + pipeWidth) &&
    (birdY < topHeight1-5 || birdY + 20 > bottomY1)) {
     lives--;
        if (lives <= 0) {
            clearInterval(birdInterval);
            endscreen();
        } else {
            birdY = 55;
        }
    }
// Hit pillar 2 (top or bottom)
if (
    (30 > pipeX2 && 10 < pipeX2 + pipeWidth) &&
    (birdY < topHeight2-5 || birdY + 20 > bottomY2)) {
     lives--;
        if (lives <= 0) {
            clearInterval(birdInterval);
            endscreen();
        } else {
            birdY = 55;
        }
    }
}
  


function endscreen(){
  graphics.clearRect(0, 0, canvas.width, canvas.height);
    graphics.fillStyle="blue";
    graphics.fillRect(0,0,canvas.width,canvas.height,)
    graphics.fillStyle="black";
    graphics.fillText("GAME OVER     SCORE:"+score,55,50)
    restartbutton();
}

function restartbutton(){
    graphics.fillStyle="magenta";
    graphics.fillRect(100,100,75,20); // Button area
    graphics.font = "12px Arial";
    graphics.fillStyle="black";
    graphics.fillText("play again", 110, 115); // Text inside button
    // Remove any previous listener to avoid stacking
    canvas.removeEventListener("click", checkrestart);
    canvas.addEventListener("click", checkrestart); // Listen for clicks
}
   
function checkrestart(e){
    let canvasrect = canvas.getBoundingClientRect();
    let cx = (e.clientX - canvasrect.left) * (canvas.width / canvasrect.width);
    let cy = (e.clientY - canvasrect.top) * (canvas.height / canvasrect.height);
    if(lives <= 0 && cx >= 100 && cx <= 175 && cy >= 100 && cy <= 120){
        lives = 1;
        score = 0;
        birdY = 55;
        velocity = 0;
        pipeX1 = canvas.width;
        topHeight1 = Math.floor(Math.random() * (canvas.height - pipeGap - 40 )) + 50;
        bottomY1 = topHeight1 + pipeGap;
        bottomhight1 = canvas.height - bottomY1;
        pipe1Scored = false;
        pipeX2 = canvas.width + canvas.width / 2;
        topHeight2 = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 50;
        bottomY2 = topHeight2 + pipeGap;
        bottomhight2 = canvas.height - bottomY2;
        pipe2Scored = false;
        canvas.removeEventListener("click", checkrestart); // Remove listener after restart
        requestAnimationFrame(animate);
    }
}

// window.setInterval(animate,FPS/1000)

// onmouseclick
// velocity+10;
// animate

// if (v>0)
//     bbirdy=birdy-velcoity;
// velcoity=velcoity-2;