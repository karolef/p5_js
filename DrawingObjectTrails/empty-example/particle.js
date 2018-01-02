class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.history = [];
  }

  update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);

    for (var i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-2, 2);
      this.history[i].y += random(-2, 2);
    }

    let v = createVector(this.x, this.y);
    this.history.push(v);
    if (this.history.length > 100) {
      this.history.splice(0, 1);
    }

  }

  show() {
    fill(0, 150);
    ellipse(this.x, this.y, 25, 25);

    noFill();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      //fill(random(255));
      //ellipse(pos.x, pos.y, i, i);

      vertex(pos.x, pos.y);
    }

    endShape();
  }


}
