let canvas = document.querySelector("canvas");
console.log("canvas");
const graphics = canvas.getContext("2d");

function grass(){
    graphics.fillStyle="green";
    graphics.fillRect(0,140, canvas.width,20);
}

grass();