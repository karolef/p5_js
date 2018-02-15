function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(-90);
  let hr = hour();
  let min = minute();
  let sec = second();
  strokeWeight(7);
  noFill();
  // seconds' arc
  stroke(0, 150, 255);
  let angleSec = map(sec, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, angleSec);
  // minutes' arc
  stroke(0, 100, 255);
  let angleMin = map(min, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, angleMin);
  // hrs arc
  stroke(0, 50, 255);
  let angleHr = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 260, 260, 0, angleHr);

  // hands of the clock
  push();
  rotate(angleSec);
  stroke(0, 150, 255);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(angleMin);
  stroke(0, 100, 255);
  line(0, 0, 70, 0);
  pop();

  push();
  rotate(angleHr);
  stroke(0, 50, 255);
  line(0, 0, 40, 0);
  pop();

  stroke(0);
  point(0, 0);
}
