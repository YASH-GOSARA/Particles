/** @type {HTMLCanvasElement} */
var numberOfParticles=0;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let color = [
  "#d8e2dc",
  "#ffe5d9",
  "#ffcad4",
  "#f4acb7",
  "#696d7d",
  "#fff5f6",
  "#cc938f",
];
var mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (position) => {
  mouse.x = position.x;
  mouse.y = position.y;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (canvas.width <= 500 && canvas.width >= 100) {
  numberOfParticles = 50;
} else if (canvas.width > 500 && canvas.width <= 700) {
  numberOfParticles = 80;
} else if (canvas.width > 700 && canvas.width <= 1000) {
  numberOfParticles = 110;
} else if (canvas.width > 1000) {
  numberOfParticles = 130;
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if(canvas.width <500 && canvas.width > 100){
    numberOfParticles = 50;
  }
  else if (canvas.width > 500 && canvas.width<700) {
    numberOfParticles =80;
  }else if (canvas.width > 700 && canvas.width < 1000) {
    numberOfParticles = 110;
  } else if (canvas.width > 1000) {
    numberOfParticles = 130;
  }
  init();
});

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  drawCircle() {
    ctx.beginPath();
    ctx.fillStyle = "#ee6c4d";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }

  updateCircle() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.drawCircle();
  }
}

let circleArray = [];

let radius;
let x;
let y;
let dx;
let dy;

function init() {
  circleArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    radius = 3 + Math.random() * 3;
    x = radius + Math.random() * (innerWidth - 2 * radius);
    y = radius + Math.random() * (innerHeight - 2 * radius);
    dx = Math.random() * 1 - 0.5;
    dy = Math.random() * 1 - 0.5;
    circleArray.push(
      new Circle(
        x,
        y,
        dx,
        dy,
        radius,
        color[Math.floor(Math.random() * color.length)]
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].updateCircle();
  }

  drawLine();
  drawForMobile();
  requestAnimationFrame(animate);
}

animate();
init();

function drawLine() {
  for (let i = 0; i < circleArray.length; i++) {
    for (let j = 0; j < circleArray.length; j++) {
      if (
        circleArray[i].x - circleArray[j].x < 50 &&
        circleArray[i].y - circleArray[j].y < 50 &&
        circleArray[i].x - circleArray[j].x > -50 &&
        circleArray[i].y - circleArray[j].y > -50 &&
        i != j
      ) {
        ctx.beginPath();
        ctx.strokeStyle = "#3d5a80";
        ctx.moveTo(circleArray[i].x, circleArray[i].y);
        ctx.lineTo(circleArray[j].x, circleArray[j].y);
        ctx.stroke();
      }
    }

    if (
      mouse.x - circleArray[i].x < 100 &&
      mouse.y - circleArray[i].y < 100 &&
      mouse.x - circleArray[i].x > -100 &&
      mouse.y - circleArray[i].y > -100
    ) {
      ctx.beginPath();
      ctx.strokeStyle = "#e0fbfc";
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(circleArray[i].x, circleArray[i].y);
      ctx.stroke();
    }
  }
}

var screen = {
  x: undefined,
  y: undefined,
};
var touchObj;

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  touchObj = e.changedTouches[0];
  screen.x = touchObj.clientX;
  screen.y = touchObj.clientY;
});

canvas.addEventListener("touchend", (e) => {
  touchObj = e.changedTouches[0];
  screen.x = undefined;
  screen.y = undefined;
  e.preventDefault();
});

function drawForMobile() {
  for (let i = 0; i < circleArray.length; i++) {
    if (
      screen.x - circleArray[i].x < 80 &&
      screen.y - circleArray[i].y < 80 &&
      screen.x - circleArray[i].x > -80 &&
      screen.y - circleArray[i].y > -80
    ) {
      ctx.beginPath();
      ctx.strokeStyle = "#e0fbfc";
      ctx.moveTo(screen.x, screen.y);
      ctx.lineTo(circleArray[i].x, circleArray[i].y);
      ctx.stroke();
    }
  }
}
drawForMobile();

canvas.addEventListener("click", function (e) {
  e.stopPropagation();
});

canvas.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  e.stopPropagation();
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  mouse.x = undefined;
  mouse.y = undefined;
});