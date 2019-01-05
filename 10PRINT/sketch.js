// 10PRINT
let x = 0;
let y = 0;
let offset = 5;
let userInput;
let p;
let img;
let slashes;
let active = false;

function setup() {
  userInput = createFileInput(handleFile);
  userInput.position(0, height / 2);
  p = createP("10PRINT - Choose an image (not too big)");
  p.position(0, height / 2 + 25);
  slashes = new Slash(x, y, offset);
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data);
    setTimeout(resize, 50);
  }
}

function resize() {
  resizeCanvas(img.width+offset, img.height+offset);
  userInput.position(0, height+5);
  p.position(0, height+15);
  background(0);
  slashes.x = 0;
  slashes.y = 0;
  active = true;
}

function draw() {
  if (active) {
    slashes.update();
    slashes.display();
  }
}
