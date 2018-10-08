let x = 0;
let y = 0;

function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
  for (let i = 0; i < 100; i++) {
    drawPoint();
    nextPoint();
  }
}

function nextPoint() {
  let xNext;
  let yNext;
  let r = random(1);

  if (r < 0.01) {
    xNext = 0;
    yNext = 0.16 * y;
  } else if (r < 0.86) {
    xNext = 0.85 * x + 0.04 * y;
    yNext = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    xNext = 0.20 * x - 0.26 * y;
    yNext = 0.23 * x + 0.22 * y + 1.6;
  } else {
    xNext = -0.15 * x + 0.28 * y;
    yNext = 0.26 * x + 0.24 * y + 0.44;
  }
  x = xNext;
  y = yNext;
}

function drawPoint() {
  stroke(255);
  strokeWeight(2);
  let px = map(x, -2.1820, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);
  point(px, py);
}
