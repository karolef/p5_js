let cols, rows;
let w = 20;
let grid = [];

let current;

let stack = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);

  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  let next = current.checkNeighbors();
  if (next){
    next.visited = true;

    stack.push(current);

    removeWalls(current,next);

    current = next;
  } else if (stack.length > 0){
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows -1){
    return -1;
  }
  return i + j * cols;
}
