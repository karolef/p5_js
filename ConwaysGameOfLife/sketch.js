// Conway's Game of Life cellular automata
// 1. Any live cell with fewer than two live neighbours dies,
// as if caused by underpopulation.
// 2. Any live cell with two or three live neighbours lives on
// to the next generation.
// 3. Any live cell with more than three live neighbours dies,
// as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes
// a live cell, as if by reproduction.

let grid;
let cols;
let rows;
let res = 10;

function setup() {
  createCanvas(600, 600);
  cols = width / res;
  rows = height / res;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  // console.table(grid);
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      if (grid[i][j] == 1) {
        fill(0);
        stroke(0);
        rect(x, y, res - 1, res - 1);
      }
    }
  }
  let nextGen = make2DArray(cols, rows);
  // nextGen based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // count live neighbours
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      if (state == 0 && neighbors == 3) {
        nextGen[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGen[i][j] = 0;
      } else {
        nextGen[i][j] = state;
      }
    }
  }
  grid = nextGen;
}

// nested array fnc
function make2DArray(cols, rows) {
  let array = new Array(cols);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

// neighbor count, exclude itself and wrap around edges
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
