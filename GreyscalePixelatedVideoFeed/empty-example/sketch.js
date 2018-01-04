let video;
let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale,height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();

  loadPixels();
  for (let y = 0; y < video.width; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x+y*video.width)*4;
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];

      let bright = (r+g+b)/3;

      fill(bright);
      noStroke();
      rect(x*vScale,y*vScale, vScale, vScale);

      // pixels[index+0] = bright;
      // pixels[index+1] = bright;
      // pixels[index+2] = bright;
      // pixels[index+3] = 255;

    }
  }

  // updatePixels();
}
