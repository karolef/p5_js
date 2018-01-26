function Particle(x, y, hue, explosion) {
  this.position = createVector(x, y);
  this.explosion = explosion;
  this.lifespan = 255;
  this.hue = hue;

  if (!explosion) {
    this.velocity = createVector(0, random(-12, -7));
  } else {
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 10));
  }
  this.acceleration = createVector(0, 0);
  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    if (this.explosion) {
      this.velocity.mult(0.9);
      this.lifespan -= 4;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    if (this.explosion) {
      strokeWeight(2);
      stroke(hue, 255, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hue, 255, 255);
    }
    point(this.position.x, this.position.y);
  }
}
