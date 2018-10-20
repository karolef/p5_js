// A*
// f(n) = g(n) + h(n)
// g - known amount/cost, e.g. distance between nodes in a node tree
// h - heuristic; heuristics - "educated guessing"
// f(n) - cost function
// never overestimate your guess, the algorithm might not work
// underestimating is fine

// algorithm is finished either when u get to the end or the open set is empty

let cols = 50;
let rows = 50;
let grid = new Array(cols);

// closed set - a set of nodes u wont need to revisit
// open set - a set of nodes still to be evaluated

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];


function setup() {
  createCanvas(600, 600);
  w = width / cols;
  h = height / rows;

  // 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  start.startOrEnd = true;
  end.startOrEnd = true;

  openSet.push(start);
  // console.log(start);
  console.log(grid);
}

function draw() {
  background(255);


  let winner = 0;
  if (openSet.length > 0) {
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
    if (current === end) {
      noLoop();
      console.log("You reached the end");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    console.log('No solution');
    noLoop();
    return;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(0, 0, 0);
    }
  }


  // for (let i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show(color(255, 0, 0));
  // }
  //
  // for (let i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0));
  // }

  // show the path

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // for (let i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }

  noFill();
  stroke(50, 200, 255);
  strokeWeight(w / 2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
  start.show(color(50, 255, 50));
  end.show(color(255, 0, 0));
}

function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  // let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function removeFromArray(arr, el) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == el) {
      arr.splice(i, 1);
    }
  }
}
