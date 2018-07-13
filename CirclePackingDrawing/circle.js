function Circle(x, y, r, col) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.growing = true;
  this.color = col;

  this.show = function() {
    // stroke(255);
    // strokeWeight(2);
    // noFill();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.grow = function() {
    if (this.growing) {
      this.r += 0.5;;
    }
  }

  this.edges = function() {
    return (this.x + this.r >= width / 2 || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }
}
