let x = 200;
let y = 200;

function setup() {
  createCanvas(400, 400);
  background(50);
}

function draw() {
  stroke(255);
  strokeWeight(2);
  point(x, y);

  let r = floor(random(4));
  switch (r) {
    //move up
    case 0:
      y = y - 1;
      break;

    //move left
    case 1:
      x = x - 1;
      break;

    //move down
    case 2:
      y = y + 1;
      break;

    //move right
    case 3:
      x = x + 1;
      break;
  }
}
