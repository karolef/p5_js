let font;
let bubbles = [];

function preload() {
  font = loadFont('CookieMonster.ttf');
}

function setup() {
  createCanvas(1250, 300);
  let outline = font.textToPoints('mouse over me!', 10, 200, 200);
  // creating bubbles and assigning them target from txt outline
  for (let i = 0; i < outline.length; i++) {
    let pt = outline[i];
    let bubble = new Bubble(pt.x, pt.y);
    bubbles.push(bubble);
  }
}

function draw() {
  background(50);
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    b.behavior();
    b.update();
    b.show();
  }
}
