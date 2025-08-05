var canvas = document.querySelector("canvas");
var graphics = canvas.getContext("2d");

const doodleImg = new Image();
doodleImg.src = "Doodlejumpdorkly.webp";

var dorklyY;
var dorklyX;


function animate(){
    
    draw();
    platform();
}

 doodleImg.onload = function() {
    setInterval(animate, 1000 / 60); // 60 FPS
};

function draw() {
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    
    if (dorklyY === undefined) {
        dorklyY = 100;
    }
    if (dorklyX === undefined) {
        dorklyX = 100;
    }
    
    graphics.drawImage(doodleImg, dorklyX, dorklyY, 50, 50);
    
    dorklyY += 2; // Gravity effect
    if (dorklyY > canvas.height - 50) {
        dorklyY = canvas.height - 50; // Prevent going off the bottom
    }

}

function platform(){
    var oblong = {
        x: 100,
        y: 200,
        width: 150,
        height: 20
    };
    graphics.fillStyle = 'green';
    graphics.beginPath();
    graphics.ellipse(oblong.x + oblong.width / 2, oblong.y + oblong.height / 2, oblong.width / 3, oblong.height / 4, 0, 0, 2 * Math.PI);
    
    graphics.fill();
    graphics.closePath();
}