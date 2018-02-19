var mousePosition,
  position,
  target,
  velocity,
  drag, //to take the force away
  strength; // stiffness of the spring

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  mousePosition = createVector(0, 0);
  position = createVector(0, 0);
  target = createVector(0, 0);
  velocity = createVector(0, 0);
  drag = 0.9;
  strength = 0.3;
  r = 100;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('rgba(50, 50, 50, 0.6)');
  mousePosition.set(mouseX, mouseY);
  target = mousePosition;

  let force = p5.Vector.sub(target, position);
  force = force.mult(strength);
  velocity = velocity.mult(drag);
  velocity = velocity.add(force);
  position = position.add(velocity);

  fill(50, 50, 250, 150);
  ellipse(position.x, position.y, r);
}
