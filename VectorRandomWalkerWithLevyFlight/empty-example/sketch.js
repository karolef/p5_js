let pos;
let previous;
let n = 0;

function setup() {
  createCanvas(600, 600);
  background(50);
  colorMode(HSB);
  pos = createVector(width / 2, height / 2);
  previous = pos.copy();
}

function draw() {
  stroke(n % 256, 255, 255);
  n++;
  strokeWeight(2);
  line(pos.x, pos.y, previous.x, previous.y);
  previous.set(pos);
  let step = p5.Vector.random2D();
  let r = random(1);
  //Levy flight
  if (r < 0.01) {
    step.mult(random(50, 100));
  } else {
    step.setMag(2);
  }
  pos = pos.add(step);
}
