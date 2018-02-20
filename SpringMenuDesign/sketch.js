let dots = [],
  position, target, velocity, spring, speed;
let animate = false,
  open = false,
  canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.touchStarted(flip);

  colorMode(HSB, 110);
  background(255);
  noStroke();
  translate(width / 2, height / 2);
  position = new p5.Vector(0, 0);
  target = new p5.Vector(0, 0);
  velocity = new p5.Vector(0, 0);
  spring = 0.65;
  speed = 0.1;

  let buttons = 10;
  let hue = 45;
  for (let i = 0; i < buttons; i++) {
    let offsetAngle = (2 * PI) / buttons;
    let radius = 150;
    target = new p5.Vector(radius * sin(offsetAngle * i), radius * cos(offsetAngle * i));
    let dot = new Dot(position.x, position.y, target, hue + (i * 5));
    dots.push(dot);
    dot.render();
  }
}

function draw() {
  if (animate == true) {
    fill(255);
    translate(width / 2, height / 2);
    rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);

    for (let i = 0; i < dots.length; i++) {
      let d = dots[i];
      if (open) {
        target.set(0, 0);
      } else {
        target.set(d.target.x, d.target.y);
      }

      position.set(d.positionX, d.positionY);
      velocity.set(d.velocityX, d.velocityY);
      velocity.mult(spring);
      let difference = p5.Vector.sub(target, position);
      difference.mult(speed);
      velocity.add(difference);
      position.add(velocity);
      d.positionX = position.x;
      d.positionY = position.y;
      d.velocityX = velocity.x;
      d.velocityY = velocity.y;
      d.render();
    }
  }
}

function flip() {
  if (!animate) {
    animate = true;
  } else {
    if (!open) {
      open = true;
    } else if (open) {
      open = false;
    }
  }
}

function Dot(px, py, t, hue) {
  this.positionX = px;
  this.positionY = py;
  this.target = new p5.Vector(0, 0, 0);
  this.target.set(t);
  this.velocityX = 0;
  this.velocityY = 0;
  this.size = 80;
  this.hue = hue;

  this.render = function() {
    fill(hue, 100, 100);
    ellipse(this.positionX, this.positionY, this.size, this.size);
  }
}
