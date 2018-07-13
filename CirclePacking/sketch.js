let circles = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  // frameRate(8);
  background(0);
  checkCircle();

  let total = 10;
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
  let x = random(width);
  let y = random(height);
  let r = 1;
  let valid = true;

  for (let i = 0; i < circles.length; i++) {
    let d = dist(x, y, circles[i].x, circles[i].y);
    if (d < circles[i].r) {
      valid = false;
      break;
    }
  }

  if (valid) {
    return new Circle(x, y, r);
  } else {
    return null;
  }
}
