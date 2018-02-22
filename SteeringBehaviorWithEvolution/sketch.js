let organisms = [];
let food = [];
let poison = [];
let range;

function setup() {
  createCanvas(800, 400);
  // create random organisms, food and poison
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    organisms[i] = new Organism(x, y);
  }
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }
  for (let i = 0; i < 40; i++) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
  }
  createP("Organisms seek food (green) to sustain themselves, avoid poison (red) and have a chance to give birth to a child.")
  range = createCheckbox("Senses of the organisms", false);
  createP("Click on the canvas to create new random organism.");
}

// adding new random organism on click within the canvas
function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    organisms.push(new Organism(mouseX, mouseY));
  }
}

function draw() {
  background(0);

  // random chance to generate food
  if (random(1) < 0.15) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }

  // random chance to generate poison and remove the first one in array
  if (random(1) < 0.05) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
    if (random(1) < 0.7) {
      poison.splice(0, 1);
    }
  }

  // draw food and poison
  for (let i = 0; i < food.length; i++) {
    fill(0, 255, 0, 150);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }
  for (let i = 0; i < poison.length; i++) {
    fill(255, 0, 0, 150);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  // call organism functions
  for (let i = organisms.length - 1; i >= 0; i--) {
    organisms[i].boundaries();
    organisms[i].behaviors(food, poison);
    organisms[i].update();
    organisms[i].display();
    let child = organisms[i].mitosis();
    if (child != null) {
      organisms.push(child);
    }
    // create either food (70%) or poison (30%) on death
    if (organisms[i].dead()) {
      let x = organisms[i].position.x;
      let y = organisms[i].position.y;
      if (random(1) > 0.3) {
        food.push(createVector(x, y));
      } else {
        poison.push(createVector(x, y));
      }
      organisms.splice(i, 1);
    }
  }
}
