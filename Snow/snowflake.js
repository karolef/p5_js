class Snowflake {
  constructor(snowX, snowY, img) {
    let x = snowX || random(width);
    let y = snowY || random(-100, -32);
    this.design = img;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector();
    this.r = getRandomSize();
    this.angle = random(TWO_PI);
    this.spinDirection = (random(1) > 0.5) ? 1 : -1;
    this.xOffset = 0;
  }

  applyForce(force) {
    // parallax effect
    let f = force.copy();
    f.mult(this.r);
    this.acceleration.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -32);
    this.design = random(flakeDesigns);
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector();
    this.r = getRandomSize();
    this.angle = random(TWO_PI);
    this.spinDirection = (random(1) > 0.5) ? 1 : -1;
  }

  render() {
    push();
    translate(this.position.x + this.xOffset, this.position.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.design, 0, 0, this.r, this.r);
    pop();
  }

  update() {
    this.xOffset = sin(this.angle*2) * this.r * 2;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.r * 0.2)
    if (this.velocity.mag() < 1) {
      this.velocity.normalize();
    }
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // recycle the snowflakes when they reach the bottom
    if (this.position.y > height + this.r) {
      this.randomize();
    }

    //wrapping left&right
    if (this.position.x < -this.r) {
      this.position.x = width + this.r;
    }
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    }

    this.angle += this.spinDirection * this.velocity.mag() / 400;
  }
}

function getRandomSize() {
  let r = pow(random(0, 1), 2);
  return constrain(r * 32, 2, 32);
}
