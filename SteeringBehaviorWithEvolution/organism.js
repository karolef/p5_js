class Organism {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 5;
    this.maxforce = 0.5;
    this.health = 1;
    this.dna = [];
    this.mutationRate = 0.05;
    if (dna === undefined) {
      //food attraction
      this.dna[0] = random(-2, 2);
      // poison attraction
      this.dna[1] = random(-2, 2);
      // food perception
      this.dna[2] = random(0, 100);
      // poison perception
      this.dna[3] = random(0, 100);
    } else {
      // dna of the new population + mutation chance
      this.dna[0] = dna[0];
      this.dna[1] = dna[1];
      if (random(1) < this.mutationRate) {
        this.dna[0] += random(-0.1, 0.1);
        this.dna[1] += random(-0.1, 0.1);
      }
      this.dna[2] = dna[2];
      this.dna[3] = dna[3];
      if (random(1) < this.mutationRate) {
        this.dna[2] += random(-10, 10);
        this.dna[3] += random(-10, 10);
      }
    }
  }

  update() {
    this.health -= 0.005;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  behaviors(good, bad) {
    let foodDesire = this.eat(good, 0.3, this.dna[2]);
    let poisonDesire = this.eat(bad, -0.8, this.dna[3]);

    foodDesire.mult(this.dna[0]);
    poisonDesire.mult(this.dna[1]);
    this.applyForce(foodDesire);
    this.applyForce(poisonDesire);
  }

  eat(list, nutrition, perception) {
    let record = Infinity;
    let closest = null;
    for (let i = list.length - 1; i >= 0; i--) {
      let d = this.position.dist(list[i]);

      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    if (closest != null) {
      return this.seek(closest);
    }
    return createVector(0, 0);
  }

  // every so often the organism will create offspring
  // the longer it survives the higher the chance
  mitosis() {
    if (random(1) < 0.001) {
      return new Organism(this.position.x, this.position.y, this.dna);
    } else {
      return null;
    }
  }

  // steering = desired vector - current velocity vector
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
    let angle = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    // senses of the organisms
    if (range.checked()) {
      strokeWeight(3);
      stroke(0, 255, 0);
      noFill();
      line(0, 0, 0, -this.dna[0] * 20);
      strokeWeight(2);
      ellipse(0, 0, this.dna[2] * 2);
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 20);
      ellipse(0, 0, this.dna[3] * 2);
    }
    // organisms
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

  // organisms cannot fly over the edge of the canvas
  boundaries() {
    let edgeDist = 25;
    let desired = null;
    if (this.position.x < edgeDist) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - edgeDist) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < edgeDist) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - edgeDist) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}
