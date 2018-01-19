function Branch(start, end) {
  this.start = start;
  this.end = end;
  this.finished = false;

  this.jitter = function(){
    this.end.x += random(-1,1);
    this.end.y += random(-1,1);
  }

  this.show = function() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  this.branchingA = function(){
    let direction = p5.Vector.sub(this.end, this.start);
    direction.rotate(PI/6);
    direction.mult(0.67);
    let newEnd = p5.Vector.add(this.end, direction);
    let right = new Branch(this.end, newEnd);
    return right;
  }

  this.branchingB = function(){
    let direction = p5.Vector.sub(this.end, this.start);
    direction.rotate(-PI/4);
    direction.mult(0.67);
    let newEnd = p5.Vector.add(this.end, direction);
    let left = new Branch(this.end, newEnd);
    return left;
  }
}
