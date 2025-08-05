let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

function road1(){
    graphics.fillStyle="gray";
    graphics.fillRect(100,100, canvas.width,100);
}