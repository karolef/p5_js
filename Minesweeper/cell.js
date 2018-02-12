// mine = true || false
// x,y, w,h
// revealed = true || false

function Cell(i, j, size) {
  this.i = i;
  this.j = j;
  this.x = i * size;
  this.y = j * size;
  this.size = size;
  this.neighborCount = 0;
  this.mine = false;
  this.revealed = false;
}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.size, this.size);
  if (this.revealed) {
    if (this.mine) {
      fill(50);
      rect(this.x, this.y, this.size, this.size);
      fill(255, 0, 0);
      ellipse(this.x + this.size * 0.5, this.y + this.size * 0.5, this.size * 0.5);
    } else {
      fill(0, 200, 255);
      rect(this.x, this.y, this.size, this.size);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        textSize(20);
        text(this.neighborCount, this.x + this.size * 0.5, this.y + this.size - 12);
      }
    }
  }
}

// checking neighbors for mines
Cell.prototype.countMines = function() {
  if (this.mine) {
    this.neighborCount = -1;
    return;
  }
  // checking neighbors for mines, there is no need to exclude itself
  // because of the first if statement
  let count = 0;
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < nCols && j > -1 && j < nRows) {
        let neighbor = grid[i][j];
        if (neighbor.mine) {
          count++;
        }
      }
    }
  }
  this.neighborCount = count;
}

// checking mouse XY
Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    this.floodFill();
  }
}

// flood fill algorithm?
Cell.prototype.floodFill = function() {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < nCols && j > -1 && j < nRows) {
        let neighbor = grid[i][j];
        if (!neighbor.mine && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
}
