function Branch(parent, position, direction) {
  this.parent = parent;
  this.position = position;
  this.direction = direction;
  this.originalDirection = this.direction.copy();
  this.counter = 0;
  this.length = 5;



  this.next = function() {
    this.direction.normalize();
    let nextDirection = p5.Vector.mult(this.direction, this.length);
    let nextPosition = p5.Vector.add(this.position, nextDirection);
    let nextBranch = new Branch(this, nextPosition, this.direction.copy());
    return nextBranch;
  }

  this.show = function() {
    if (parent != null) {
      stroke(255);
      line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y);
    }
  }

  this.reset = function (){
    this.direction = this.originalDirection.copy();
    this.counter = 0;
  }


}
