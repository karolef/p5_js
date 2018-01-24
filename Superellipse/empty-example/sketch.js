let slider;

function setup() {
  createCanvas(600, 600);
  // slider = createSlider(0, 10, 2, 0.1);
}

function draw() {
  background(150);
  translate(width / 2, height / 2);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let a = 200;
    let b = 200;
    let n = map(mouseX, 0,width, 0,10); //slider.value();
    let color = map(mouseY, 0, height, 0,255);
    stroke(0, 0, color, 100);
    noFill();
    strokeWeight(2);
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(value) {
  if (value > 0) {
    return 1;
  } else if (value < 0) {
    return -1;
  } else {
    return 0;
  }
}
