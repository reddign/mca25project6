let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

const pipeWidth = 30;
const pipeGap = 60; // Fixed gap between top and bottom pipes
const pipeSpeed = 1;
const FPS = 27;
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
falling()
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


function pipes(){
        // Collision detection for both pillars
        // Bird rectangle: x=10, y=birdY, w=30, h=30
     graphics.fillStyle = "black";
      
    // First pillar
    if (typeof window.pipeX1 === 'undefined') {
        window.pipeX1 = canvas.width;
        window.topHeight1 = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        window.bottomY1 = window.topHeight1 + pipeGap;
        window.bottomhight1 = canvas.height - window.bottomY1;
    }
    window.pipeX1 -= pipeSpeed;
    if (window.pipeX1 + pipeWidth < 0) {
        window.pipeX1 = canvas.width;
        window.topHeight1 = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        window.bottomY1 = window.topHeight1 + pipeGap;
        window.bottomhight1 = canvas.height - window.bottomY1;
    }
    graphics.fillStyle = "black";
    graphics.fillRect(window.pipeX1, 0, pipeWidth, window.topHeight1);
    graphics.fillRect(window.pipeX1, window.bottomY1, pipeWidth, window.bottomhight1);

    // Second pillar
    if (typeof window.pipeX2 === 'undefined') {
        window.pipeX2 = canvas.width + canvas.width / 2;
        window.topHeight2 = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        window.bottomY2 = window.topHeight2 + pipeGap;
        window.bottomhight2 = canvas.height - window.bottomY2;
    }
    window.pipeX2 -= pipeSpeed;
    if (window.pipeX2 + pipeWidth < 0) {
        window.pipeX2 = canvas.width;
        window.topHeight2 = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        window.bottomY2 = window.topHeight2 + pipeGap;
        window.bottomhight2 = canvas.height - window.bottomY2;
    }

    graphics.fillStyle = "black";
    graphics.fillRect(window.pipeX2, 0, pipeWidth, window.topHeight2);
    graphics.fillRect(window.pipeX2, window.bottomY2, pipeWidth, window.bottomhight2);
}
function drawbird(){
    graphics.drawImage(image, 10, birdY, 30, 30);
}
function createPipe() {
      

  // Random height for the top pipe (between 50 and canvasHeight - pipeGap - 50)
  const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;

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
    graphics.fillStyle="black";
    graphics.fillText("play again", 110, 115); // Text inside button
    graphics.font = "16px Arial";
    canvas.addEventListener("click", checkrestart); // Listen for clicks
}
   
function checkrestart(e){
    let canvasrect = canvas.getBoundingClientRect();
    let cx = e.clientX - canvasrect.x;
    let cy = e.clientY - canvasrect.y;
    if(lives <= 0 && cx >= 100 && cx <= 175 && cy >= 100 && cy <= 120){
        lives = 1;
        score = 0;
        birdY = 55;
        canvas.removeEventListener("click", checkrestart); // Remove listener after restart
        animate();
    }
}

window.setInterval(animate,FPS/1000)

// onmouseclick
// velocity+10;
// animate

// if (v>0)
//     bbirdy=birdy-velcoity;
// velcoity=velcoity-2;