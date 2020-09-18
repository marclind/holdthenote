// *******************
// setup
// *******************

const userDefined = {
  gravity: 2,
  friction: .99,
  ballSize: 15,
  wallFriction: .5,
  distribution: 1,
  spread: 10
}

const colours = [
  '0xFFE358',
  '0x00DFA1',
  '0xFFB957',
  '0x8577F5'
]

const coloursLength = colours.length;
const halfSpread = userDefined.spread / 2;
var mouse = { x: 0, y: 0 };
var oldMouse = { x: 0, y: 0 };
var balls = [];


// *******************
// image
// *******************

const pixelTexture = PIXI.Texture.fromImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5NDk2MURFNUU4MjExRTdCRTA2OUFEMEFFNUI1RTZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5NDk2MURGNUU4MjExRTdCRTA2OUFEMEFFNUI1RTZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mjk0OTYxREM1RTgyMTFFN0JFMDY5QUQwQUU1QjVFNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mjk0OTYxREQ1RTgyMTFFN0JFMDY5QUQwQUU1QjVFNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bdvMYAAASSUlEQVR42rxa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');


// *******************
// cache window dimensions
// *******************

var windowDimensions = {
  width: window.innerWidth,
  height: window.innerHeight
}


// *******************
// setup pixi
// *******************
const app = new PIXI.Application(windowDimensions.width, windowDimensions.height, { antialias: true, transparent: true });
document.body.appendChild(app.view);


// *******************
// DOM
// *******************

$(window).on('resize', function () {

  windowDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  app.renderer.resize(windowDimensions.width, windowDimensions.height);

});

//BYT UT HÄR FÖRFAN

function AnimateBalls(e) {

  /* mouse = {
    x: e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
    y: e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY,
  } */

  console.log(y)

  for (let i = 0, length = Math.random() * userDefined.distribution; i < length; i++) {

    createBall(
      sparklePos,
      y,
      (100 - oldMouse.x) * Math.random(),
      (100 - oldMouse.y) * Math.random());

  }

  oldMouse = {
    x: 100,
    y: 100
  }

};


// *******************
// function to create ball
// *******************

function createBall(x, y, xv, yv) {
  var ball = new PIXI.Sprite(pixelTexture);
  ball.x = x;
  ball.y = y;
  ball.width = ball.height = (userDefined.ballSize) * (1 + Math.random());
  ball.xv = xv + (-halfSpread + Math.random() * userDefined.spread);
  ball.yv = yv + (-halfSpread + Math.random() * userDefined.spread);
  ball.tint = colours[Math.floor(Math.random() * coloursLength)];
  balls.push(ball);
  app.stage.addChild(ball);
}


// *******************
// an intro screen so the preview shows something
// *******************

/* setTimeout(function () {
  for (let i = 0, length = userDefined.distribution*100; i < length; i++) {  
    createBall(
      Math.random()*windowDimensions.width, 
      Math.random()*(-windowDimensions.height),
      -5+Math.random()*10,
      -5+Math.random()*10)
  }
}, 2500); */

// ******************
// render loop
// ******************   

(function loop() {

  for (let i = 0, length = balls.length; i < length; i++) {
    // move
    balls[i].x += balls[i].xv;
    balls[i].y += balls[i].yv + userDefined.gravity;

    // slow down with friction
    balls[i].xv *= userDefined.friction;
    balls[i].yv *= userDefined.friction;

    // dont allow off sides
    if (balls[i].x <= 0) {
      balls[i].x = 0;
    } else if (balls[i].x >= windowDimensions.width - userDefined.ballSize) {
      balls[i].x = windowDimensions.width - userDefined.ballSize;
    }

    // bounce off
    if (balls[i].x <= 0 || balls[i].x >= windowDimensions.width - userDefined.ballSize) {

      // reverse speed
      balls[i].xv *= -1;

      // slow down a bit
      balls[i].xv *= userDefined.wallFriction;
    }
  }

  // run a clean up
  for (let i = 0, length = balls.length; i < length; i++) {
    if (balls[i].y >= windowDimensions.height) {
      app.stage.removeChild(balls[i]);
      balls.splice(i, 1);
      length--;
    }
  }

  // run again
  requestAnimationFrame(loop);

})();