let attractors = [];
let particles = [];
let col = 0;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255);
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

function draw() {
  background(50);
  particles.push(new Particle(random(width), random(height)));
  strokeWeight(6);
  for (let i = 0; i < attractors.length; i++) {
    stroke(255, 255, 255);
    point(attractors[i].x, attractors[i].y);
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < attractors.length; j++) {
      particles[i].attracted(attractors[j]);
    }
    if (particles[i].lifespan()) {
      particles[i].update();
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}
