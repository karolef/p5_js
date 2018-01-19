let tree = [];
let leaves = [];

let counter = 0;

function setup() {
  createCanvas(800, 800);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 200);
  let root = new Branch(a, b);
  tree[0] = root;
}

function mousePressed(){
  for (let i = tree.length-1; i >= 0; i--){
    if (!tree[i].finished){
      tree.push(tree[i].branchingA());
      tree.push(tree[i].branchingB());
    }
    tree[i].finished = true;
  }
  counter++;

  if (counter === 6){
    for (let i = 0; i < tree.length; i++){
      if (!tree[i].finished){
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(50);
  for(i=0; i<tree.length; i++){
    tree[i].show();
    tree[i].jitter();
  }

  for(i=0; i<leaves.length; i++){
    fill(0,150,255,100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 15, 15);
    leaves[i].y += random(0,2);
  }
}
