let ball;

function setup() {
  createCanvas(500, 500);
  ball = new Ball(width / 2, height / 2, width / 3);
}

function draw() {
  background(151);
  ball.show();
}

function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.ctr = random(1000);

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0,100,200);
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 200) {
      let cosA = cos(a),
          sinA = sin(a),
          noi = noise(cosA + 1, sinA + 1, this.ctr),
          d = this.r + map(noi, 0, 1, -25, 25);
      vertex(d * cosA, d * sinA);
    }
    endShape();
    pop();
    this.ctr += 0.01;
  }
}
