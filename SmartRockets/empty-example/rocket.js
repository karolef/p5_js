function Rocket(dna) {
  this.position = createVector(width / 2, height);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.completed = false;
  this.crashed = false;

  if(dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.calcFitness = function() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if(this.completed){
      this.fitness *= 10;
    }
    if (this.crashed){
      this.fitness /= 10;
    }
  }

  this.update = function() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if(d <10){
      this.completed = true;
      this.position = target.copy();
    }
    if (this.position.x > rx && this.position.x < rx + rw && this.position.y > ry && this.position.y < ry + rh){
      this.crashed = true;
    }

    if (this.position.x > width || this.position.x < 0){
      this.crashed = true;
    }

    if (this.position.y > height || this.position.y < 0){
      this.crashed = true;
    }
    this.applyForce(this.dna.genes[counter]);
    if(!this.completed && !this.crashed){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(4);
    }
  }

  this.show = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    noStroke();
    fill(255, 100);
    rect(0, 0, 25, 5);
    pop();
  }
}
