// let xoff1 = 0;
// let xoff2 = 10000;

let inc = 0.01;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  let yoff = 0;
  loadPixels();

  for (let y = 0; y < height; y++) {
      let xoff = 0;
    for (let x = 0; x < width; x++) {

      let index = (x + y * width) * 4;
      let r = noise(xoff, yoff) * 255;
      pixels[index] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
  // noLoop();
}
