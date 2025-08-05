let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

const pipeWidth = 30;
const pipeGap = 40; // Fixed gap between top and bottom pipes
const pipeSpeed = 2;
const FPS = 67;
const image = new Image();
image.src = "flappy-bird.png";
let birdY = 55;

// const intervalset = window.setInterval(FPS/1000,animate)
let lives = 1;



function animate(){

pipes();
drawbird();



dies();
}
animate();


function pipes(){
    createPipe();
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

  graphics.fillstyle="black";
        graphics.fillRect(150,0,pipeWidth, topHeight);
        graphics.fillRect(150,bottomY,pipeWidth, bottomhight);
        const bottomPipe = document.createElement("div");

}

addEventListener("click", jump);


function jump() {
    
  birdY += 5;
}
const birdInterval = setInterval(() => {
    birdY += 1; // Bird goes down 1 pixel every second
    animate();
}, FPS/ 1000);

function dies(){
    if (birdY >= canvas.height || birdY <= 0) {
        lives--;
        if (lives <= 0) {
            clearInterval(birdInterval);
            endscreen();
        } else {
            birdY = 55; // Reset bird position
        }
    }
}


// function endscreen(){
//   graphics.clearRect(0, 0, canvas.width, canvas.height);
//     graphics.fillStyle="blue";
//     graphics.fillRect(0,0,canvas.width,canvas.height,)
//     graphics.fillStyle="black";
//     graphics.fillText("GAME OVER     SCORE:"+score,55,50)
//     restartbutton();
// }

// function restartbutton(){
//     graphics.fillStyle="magenta";
//     graphics.fillRect(100,100,75,20); // Button area
//     graphics.fillStyle="black";
//     graphics.fillText("play again", 110, 115); // Text inside button
//     graphics.font = "16px Arial";
//     canvas.addEventListener("click", checkrestart); // Listen for clicks
// }
   
// function checkrestart(e){
//     let canvasrect = canvas.getBoundingClientRect();
//     let cx = e.clientX - canvasrect.x;
//     let cy = e.clientY - canvasrect.y;
//     if(lives <= 0 && cx >= 100 && cx <= 175 && cy >= 100 && cy <= 120){
//         lives = 1;
//         score = 0;
//         birdY = 55;
//         canvas.removeEventListener("click", checkrestart); // Remove listener after restart
//         animate();
//     }
// }

// window.setInterval(animate,FPS/1000)

