let n1 = n2 = n3 = 1;
let m = 5;
let a = 1;
let b = 1;
let slider1, slider2;

function setup() {
  createCanvas(600, 600);
  createP('m slider');
  slider1 = createSlider(0, 10, 5, 1);
  createP('n slider');
  slider2 = createSlider(-3, 3, -1, 0.1);
}

function draw() {
  m = slider1.value();
  n1 = slider2.value();
  background(50);
  translate(width / 2, height / 2);
  beginShape();
  stroke(255, 100);
  noFill();
  strokeWeight(2);
  let radius = 100;
  let total = 150;
  let angleIncrement = TWO_PI / total;
  for (let angle = 0; angle < TWO_PI; angle += angleIncrement) {
    let r = supershape(angle);
    let x = radius * r * cos(angle)
    let y = radius * r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function supershape(angle) {
  let part1 = (1 / a) * cos(angle * m / 4);
  part1 = abs(part1);
  part1 = pow(part1, n2);
  let part2 = (1 / b) * sin(angle * m / 4);
  part2 = abs(part2);
  part2 = pow(part2, n3);
  let part3 = pow(part1 + part2, 1/n1);
  if (part3 ===0){
    return 0;
  } else {
    return (1/part3);
  }
}
