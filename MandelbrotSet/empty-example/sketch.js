let minVal = -0.5;
let maxVal = 0.5;
let minSlider;
let maxSlider;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
  let maxiterations = 25;
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());
      let ca = a;
      let cb = b;
      let count = 0;
      while (count < maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a + b) > 16) {
          break;
        }
        count++;
      }
      // let bright = map(count, 0, maxiterations, 0, 1);
      // bright = map(sqrt(bright), 0, 1, 0, 255);
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
