let circles = [];
let img;

function preload() {
  img = loadImage('img/face.jpg');
}

function setup() {
  createCanvas(img.width * 2, img.height);
  leftBuffer = createGraphics(img.width, img.height);
  // rightBuffer = createGraphics(img.width, img.height);
  pixelDensity(1);
  img.loadPixels();
  // console.log(img.width);
  // console.log(img.height);
}

function drawLeftBuffer() {
  leftBuffer.background(0);
  leftBuffer.fill(255);
}

function draw() {
  // frameRate(8);
  drawLeftBuffer();
  image(leftBuffer, 0, 0);
  image(img, img.width, 0);

  let total = 15;
  let count = 0;
  let attempts = 0;

  while (count < total) {
    let newCircle = checkCircle();
    if (newCircle != null) {
      circles.push(newCircle);
      count++;
    }
    attempts++;
    if (attempts > 500) {
      noLoop();
      console.log("FINISHED");
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    if (circles[i].growing) {
      if (circles[i].edges()) {
        circles[i].growing = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          if (circles[i] != circles[j]) {
            let d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
            if (d - 1 < circles[i].r + circles[j].r) {
              circles[i].growing = false;
              break;
            }
          }
        }
      }
    }
    circles[i].show();
    circles[i].grow();
  }
}

function checkCircle() {

  let x = random(0, img.width);
  let y = random(0, img.height);
  let r = 1;
  let valid = true;

  for (let i = 0; i < circles.length; i++) {
    let d = dist(x, y, circles[i].x, circles[i].y);
    if (d - 2 < circles[i].r) {
      valid = false;
      break;
    }
  }

  if (valid) {
    let index = (int(x) + int(y) * img.width) * 4;
    let red = img.pixels[index];
    let green = img.pixels[index + 1];
    let blue = img.pixels[index + 2];
    let col = color(red, green, blue);
    return new Circle(x, y, r, col);
  } else {
    return null;
  }
}
