let population;
let lifespan = 400;
let lifeP;
let counter = 0;
let target;
let maxForce = 0.2;

let rx = 100;
let ry = 150;
let rw = 200;
let rh = 10;

function setup() {
  createCanvas(400, 400);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(50);
  population.run();
  lifeP.html(counter);
  counter++;
  if (counter == lifespan) {
    population.evaluate();
    population.selection();
    counter = 0;
  }
  fill(255);
  rect(width/2, height/2, 200, 10);
  noStroke();
  fill(255);
  ellipse(target.x, target.y, 15, 15);
}
