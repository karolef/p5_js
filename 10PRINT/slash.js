function Slash(x, y, offset) {
  this.x = x;
  this.y = y;
  this.offset = offset;
  this.slashType;

  this.display = function() {
    stroke(img.get(this.x, this.y));
    strokeWeight(2);
    if (this.slashType) {
      line(this.x, this.y, this.x + this.offset, this.y + this.offset);
    } else {
      line(this.x, this.y + this.offset, this.x + this.offset, this.y);
    }
  }

  this.update = function() {
    if (random(1) < 0.5) {
      this.slashType = true;
    } else {
      this.slashType = false;
    }
    this.x += this.offset + 3;

    if (this.x > img.width) {
      this.x = 0;
      this.y += this.offset + 3;
    }

    if (this.y > img.height) {
      active = false;
    }
  }
}
