let tree;
let max_dist = 50;
let min_dist = 15;

function setup() {
  createCanvas(400, 400);
  tree = new Tree();
}

function draw() {
  background(50);
  tree.show();
  tree.grow();
}
