let minVal = -2.5;
let maxVal = 2.5;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  let ca = map(mouseX, 0, width, -1,1);
  let cb = map(mouseY, 0, height, -1,1);
  // let ca =cos(angle*1.1); sin(angle);
  // let cb = sin(angle);
  angle+= 0.03;
  let maxiterations = 30;
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minVal, maxVal);
      let b = map(y, 0, height, minVal, maxVal);
      let count = 0;
      while (count < maxiterations) {
        let aa = a * a;
        let bb = b * b;
        if (aa + bb> 4) {
          break;
        }
        let twoab = 2.0 * a * b;
        a = aa - bb +ca;
        b = twoab +cb;
        count++;
      }
      let bright = map(count, 0, maxiterations, 0, 255);
      if (count == maxiterations) {
        bright = 0;
      }
      let pixel = (x + y * width) * 4;
      pixels[pixel] = bright;
      pixels[pixel + 1] = 0;
      pixels[pixel + 2] = bright;
      pixels[pixel + 3] = 255;
    }
  }
  updatePixels();
}
