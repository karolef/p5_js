// adding 2 || 4 in an empty tile
function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        });
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
    grid_new[spot.x][spot.y] = 1;
  }
}

// handles cardinal directions
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid, 1);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid, 1);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
      break;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid, -1);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();
    let gameOver = isGameOver();
    if (gameOver) {
      console.log("GAME OVER");
    }
    let gameWon = isGameWon();
    if (gameWon) {
      console.log("YOU WON");
    }
  }
}

function isGameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}

function isGameOver() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

// row operations
function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

// sliding values in the array
function slide(row) {
  let ar = row.filter(value => value);
  let missing = 4 - ar.length;
  let zeros = Array(missing).fill(0);
  ar = zeros.concat(ar);
  return ar;
}

// operating on the array itself
function combine(row) {
  for (let i = 3; i > -1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}
