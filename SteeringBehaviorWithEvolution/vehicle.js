class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 5;
    this.maxforce = 0.5;
    this.health = 1;
    this.dna = [];
    this.dna[0] = random(-5, 5);
    this.dna[1] = random(-5, 5);
  }

  update() {
    this.health -= 0.01;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  behaviors(good, bad) {
    let foodDesire = this.eat(good, 0.2);
    let poisonDesire = this.eat(bad, -0.5);

    foodDesire.mult(this.dna[0]);
    poisonDesire.mult(this.dna[1]);
    this.applyForce(foodDesire);
    this.applyForce(poisonDesire);
  }

  eat(list, nutrition) {
    let record = Infinity;
    let closest = -1;
    for (let i = 0; i < list.length; i++) {
      let d = this.position.dist(list[i]);
      if (d < record) {
        record = d;
        closest = i;
      }
    }

    if (record < 5) {
      list.splice(closest, 1);
      this.health += nutrition;
    } else if (closest > -1) {
      return this.seek(list[closest]);
    }
    
    return createVector(0, 0);
  }

  // steering = desired vector  - current velocity vector
  seek(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    // this.applyForce(steer);
    return steer;
  }

  dead() {
    return (this.health < 0);
  }

  display() {
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0] * 20);
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 20);

    let blue = color(0, 0, 255);
    let red = color(255, 0, 0);
    let col = lerpColor(red, blue, this.health);

    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
