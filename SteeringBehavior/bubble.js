function Bubble(x, y) {
  this.position = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.size = 7;
  this.maxSpeed = 8;
  this.maxForce = 1;
}

Bubble.prototype.update = function() {
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
}

Bubble.prototype.show = function() {
  stroke(200, 0, 255);
  strokeWeight(this.size);
  point(this.position.x, this.position.y);
}

Bubble.prototype.behavior = function() {
  let arrive = this.arrive(this.target);
  // bubbles running away from the mouse
  let mouse = createVector(mouseX, mouseY);
  let flee = this.flee(mouse);
  arrive.mult(1);
  flee.mult(5);
  this.applyForce(arrive);
  this.applyForce(flee);
}

Bubble.prototype.applyForce = function(f) {
  this.acceleration.add(f);
}

// steering = desire - velocity
// bubbles behavior fleeing from target
Bubble.prototype.flee = function(target) {
  let desire = p5.Vector.sub(target, this.position);
  let dist = desire.mag();
  if (dist < 50) {
    desire.setMag(this.maxSpeed);
    desire.mult(-1);
    let steering = p5.Vector.sub(desire, this.velocity);
    steering.limit(this.maxForce);
    return steering;
  } else {
    return createVector(0, 0);
  }
}

// bubbles behavior arriving at target
Bubble.prototype.arrive = function(target) {
  let desire = p5.Vector.sub(target, this.position);
  let dist = desire.mag();
  let speed = this.maxSpeed;
  if (dist < 100) {
    speed = map(dist, 0, 100, 0, this.maxSpeed);
  }
  desire.setMag(speed);
  let steering = p5.Vector.sub(desire, this.velocity);
  steering.limit(this.maxForce);
  return steering;
}
