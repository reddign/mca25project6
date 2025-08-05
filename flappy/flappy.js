let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

const pipeWidth = 30;
const pipeGap = 40; // Fixed gap between top and bottom pipes
const pipeSpeed = 2;



pipes();




function pipes(){
    createPipe();
}
function drawbird(){
    graphics.fillStyle = "yellow";
    graphics.beginPath();
    graphics.arc(20, 20, 10, 0, Math.PI * 2);
    graphics.fill();
    graphics.closePath();
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
    
  
}
