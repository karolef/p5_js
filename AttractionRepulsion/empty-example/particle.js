function Particle(x, y) {
  this.position = createVector(x, y);
  this.previousPos = createVector(x, y);
  this.velocity = createVector();
  // this.velocity = p5.Vector.random2D();
  // this.velocity.setMag(random(2,5));
  this.acceleration = createVector();
  this.count = 0;
  this.col = 145;

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.lifespan = function() {
    this.count++;
    if (this.count > 400) {
      return false;
    }
    return true;
  }

  this.show = function() {
    stroke(this.col,255, 255);
    strokeWeight(2);
    line(this.position.x, this.position.y, this.previousPos.x, this.previousPos.y);
    this.previousPos.x = this.position.x;
    this.previousPos.y = this.position.y;
  }

  this.attracted = function(target) {
    let force = p5.Vector.sub(target, this.position);
    let d = force.mag();
    d = constrain(d, 1, 25);
    let grav = 15;
    let strength = grav / (d * d);
    force.setMag(strength);
    if (d < 20) {
      force.mult(-10);
    }
    this.acceleration.add(force);
  }
}
