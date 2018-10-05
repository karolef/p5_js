let values = [];
let i = 0;
let j = 0;

function setup() {
  createCanvas(500, 500);

  for (let i = 0; i < height; i++) {
    values[i] = floor(randomGaussian(0,width/4));
  }
}

function draw() {
  background(255);
  translate(width/4, height/2);

  for (let i = 0; i < values.length; i++) {
    rotate(TWO_PI / values.length);
    stroke(0);
    let dist = abs(values[i]);
    line(0,0,dist,0);
  }

  if (i < values.length) {
    for (let j = 0; j < values.length - i - 1; j++) {
      let a = values[j];
      let b = values[j + 1];
      if (a > b) {
        swap(values, j, j + 1);
      }
    }
  } else {
    print("finished");
    noLoop();
  }
  i++;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
