let grid;
let nCols;
let nRows;
let cellSize = 40;
let totalMines = 20;

function setup() {
  createCanvas(401, 401);
  createP('MINESWEEPER');
  // creating nested array for the grid and populating with cells
  nCols = floor(width / cellSize);
  nRows = floor(height / cellSize);
  grid = create2DArray(nCols, nRows);
  for (let i = 0; i < nCols; i++) {
    for (let j = 0; j < nRows; j++) {
      grid[i][j] = new Cell(i, j, cellSize);
    }
  }
  // pick totalMines cellSize
  let options = [];
  for ( let i =0; i<nCols; i++){
    for ( let j =0; j<nRows; j++){
      options.push([i,j]);
    }
  }
  for (let n = 0; n < totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    // removing the randomly chosen mine cell out of possible
    // future mine cell options
    let i = choice[0];
    let j = choice[1];
    options.splice(index,1);
    grid[i][j].mine = true;
  }

  for (let i = 0; i < nCols; i++) {
    for (let j = 0; j < nRows; j++) {
      grid[i][j].countMines();
    }
  }
}

// handles different reveals on mousePressed
function mousePressed() {
  for (let i = 0; i < nCols; i++) {
    for (let j = 0; j < nRows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if(grid[i][j].mine){
          gameOver();
        }
      }
    }
  }
}

function gameOver (){
  for (let i = 0; i < nCols; i++) {
    for (let j = 0; j < nRows; j++) {
      grid[i][j].revealed = true;
    }
  }
  createP('YOU LOST! REFRESH TO PLAY AGAIN');
}

function draw() {
  background(150);
  for (let i = 0; i < nCols; i++) {
    for (let j = 0; j < nRows; j++) {
      grid[i][j].show();
    }
  }
}

function create2DArray(nCols, nRows) {
  let array = new Array(nCols);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(nRows);
  }
  return array;
}
