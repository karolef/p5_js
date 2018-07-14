let qtree;
let count = 0;

function setup() {
  createCanvas(800, 800);
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 4);
  for (let i = 0; i < 500; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(width / 2, width / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(0);
  qtree.show();
  stroke(255, 55, 250);
  strokeWeight(2);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 100, 100);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points = qtree.query(range);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
  console.log(count);
  count = 0;
}
