function blankGrid() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
}

function copyGrid(grid) {
  let extra = blankGrid();

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function compare(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] != b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function flipGrid(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i].reverse();
  }
  return grid;
}

function transposeGrid(grid, direction) {
  let newGrid = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (direction == 1) {
        newGrid[i][j] = grid[j][i];
      } else {
        newGrid[j][i] = grid[i][j];
      }
    }
  }
  return newGrid;
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let value = grid[i][j];
      let s = value.toString();
      strokeWeight(4);
      stroke(0);
      if (value != 0) {
        fill(tileStyles[s].color);
      } else {
        noFill();
      }
      rect(i * w + 1, j * w + 1, w, w, 10);
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(tileStyles[s].size);
        noStroke();
        if (grid_new[i][j] === 1) {
          fill(255, 0, 0);
          grid_new[i][j] = 0;
        } else {
          fill(0);
        }
        text(value, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
