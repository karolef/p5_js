let inc = 0.1;
let scale = 10;
let cols, rows;
let zoff = 0;
let fr;
let particles = [];
let flowfield;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');

  flowfield = new Array(cols*rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(2);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);

      // push();
      // translate(x * scale, y * scale);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scale, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    particles[i].follow(flowfield);
  }

  fr.html(floor(frameRate()));
}
