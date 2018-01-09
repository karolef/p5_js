// let xoff1 = 0;
// let xoff2 = 10000;

let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    let n = map(noise(xoff), 0, 1, 0, height);
    let s = map(sin(xoff), -1, 1, -50, 50);
    let y = s +n;
    // let y = random(height);
    // let y = height/2 + sin(xoff)*height/2;


    vertex(x, y);

    xoff += inc;
  }
  endShape();
  start += inc;

  // noLoop();



  //let x = random(width);

  // let x = map(noise(xoff1), 0, 1, 0, width);
  // let y = map(noise(xoff2), 0, 1, 0, height);
  //
  // xoff1 += 0.01;
  // xoff2 += 0.01;

  // fill(255);
  // ellipse(x,y,24,24);

}
