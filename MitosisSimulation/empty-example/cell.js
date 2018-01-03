function Cell(pos, r, col) {

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(100,width-100), random(100,height-100));
  }
  
  this.r = r || random(50,100);
  this.col = col || color(0, random(150, 255), 255, 100);

  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  this.move = function() {
    let velocity = p5.Vector.random2D()
    this.pos.add(velocity);
  }

  this.clicked = function(x, y) {
    let d = dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.mitosis = function() {
    this.pos.x += random(-this.r*0.1, this.r*0.1);
    this.pos.y += random(-this.r*0.1, this.r*0.1);
    let cell = new Cell(this.pos, this.r * 0.75, this.col);
    return cell;
  }
}
