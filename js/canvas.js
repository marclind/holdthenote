const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 300;

const grid = 100;

let x = 0;
let y = canvas.height/2;
let dx = 5;
let dy = 0;
let radius = grid/2; 
let color = "#FF0000";

class ScoreBar {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x; 
        this.y = y;
        this.radius = radius; 
        this.color = color; 
        this.dx = dx;
        this.dy = dy; 
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fillStyle = "#0095DD";
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.x += this.dx; 
        if (this.x + this.dx > canvas.width-this.radius) {
            console.log("CRASH")
        }
    }
}

const scorebar = new ScoreBar(x, y, radius, color, dx, dy); 
scorebar.draw(); 

function animate() {
    scorebar.draw(); 
    scorebar.update(); 
    requestAnimationFrame(animate); 
}
// animate(); 

