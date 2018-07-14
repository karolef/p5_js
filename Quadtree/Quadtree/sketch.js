let qtree;

function setup() {
  createCanvas(800, 800);
  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qtree = new QuadTree(boundary, 4);
  // console.log(qtree);
}

function draw() {
  if (mouseIsPressed){
    for (let i = 0; i<5; i++){
      let m = new Point(mouseX, mouseY);
      qtree.insert(m);
    }
  }
  background(0);
  qtree.show();
}
