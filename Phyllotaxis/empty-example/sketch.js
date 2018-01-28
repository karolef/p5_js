let n = 0;
let c = 3;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(50);
  colorMode(HSB);
}

function draw() {
  let angle = n * 137.5;
  let radius = c * sqrt(n);
  let x = radius * cos(angle) + width / 2;
  let y = radius * sin(angle) + height / 2;
  fill(n % 256, 255, 255);
  noStroke();
  ellipse(x, y, 5, 5);
  n++;
}
