let n, d, k;
let sliderN;
let sliderD;

function setup() {
  createCanvas(500, 500);
  createP("Numerator");
  sliderN = createSlider(1, 10, 5, 0.5);
  createP("Denominator");
  sliderD = createSlider(1, 10, 6, 0.5);
}

function draw() {
  n = sliderN.value();
  d = sliderD.value();
  k = n / d;
  background(50);
  translate(width / 2, height / 2);
  beginShape();
  stroke(255);
  strokeWeight(2);
  noFill();
  for (let a = 0; a < TWO_PI * d; a += 0.02) {
    let r = 200 * cos(k * a);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}
