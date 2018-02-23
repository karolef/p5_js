let snow = [];
let gravity;
let zOffset = 0;
let sprites;
let flakeDesigns = [];

function preload() {
  sprites = loadImage('snowflakes32px.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.09);

  // getting the designs
  for (let x = 0; x < sprites.width; x += 32) {
    for (let y = 0; y < sprites.height; y += 32) {
      let img = sprites.get(x, y, 32, 32);
      image(img, x, y);
      flakeDesigns.push(img);
    }
  }

  // creating snowflakes
  for (let i = 0; i < 600; i++) {
    let x = random(width);
    let y = random(width);
    let design = random(flakeDesigns);
    snow.push(new Snowflake(x, y, design));
  }
}

function draw() {
  background(0);
  zOffset += 0.01;
  // drawing snowflakes applying gravity & wind
  for (flake of snow) {
    let xOffset = flake.position.x / width;
    let yOffset = flake.position.y / height;
    let windAngle = noise(xOffset, yOffset, zOffset) * TWO_PI;
    let wind = p5.Vector.fromAngle(windAngle);
    wind.mult(0.1);
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
