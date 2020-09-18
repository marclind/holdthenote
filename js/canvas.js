const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
// canvas.width = 950;
// // canvas.width = window.width; 
// canvas.height = 300;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grid = 100;

// let x = 0;
let x = 0; 
let y = canvas.height / 2;
let dx = 1;
let dy = 0;
let radius = grid / 2;
// let color = "#FF0000";
let color = "#FFA500";
let sparklePos; 

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
        this.x += this.dx * 2;

        sparklePos = this.x; 

        if (this.x + this.dx > canvas.width - this.radius + 1) {
            this.x = x;
            this.dx = 0;
            // sparklePos = canvas.width; 
            // console.log('this.x: ', this.x);
            // console.log('sparklePos: ', sparklePos);
        } else { this.dx = dx }
    }
    restart() {
        this.x = x;
    }
}

const scorebar = new ScoreBar(x, y, radius, color, dx, dy);
scorebar.draw();
// handleText(); 

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    scorebar.draw();
    scorebar.update();
    // handleText(); 
    // requestAnimationFrame(animate); 
}
// animate(); 

function stopAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scorebar.restart();
    scorebar.draw();
}

// CONTINUE TO WRITE TEXT HERE
function handleText() {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.font = '20px Verdana'

    // "Score" text
    // ctx.font = '15px Bungee';
    ctx.fillText('Blablabla', 275, 15);

    // Actual score text
    // ctx.font = '60px Bungee';
    ctx.fillText('score', 278, 65);

    // Collisions text
    // ctx.font = '15px Bungee';
    ctx.strokeText('Collisions: ', 600, 25);
}


