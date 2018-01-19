let angle;
let slider;

function setup() {
  createCanvas(800, 800);
  slider = createSlider(0, PI / 2, PI / 4, 0.01);
}

function draw() {
  background(50);
  stroke(255);
  //to make the tree grow
  angle = slider.value();

  translate(400, height);
  branch(200);
}

//recursive function to get both sides of the tree
function branch(length) {
  line(0, 0, 0, -length);
  translate(0, -length);

  if (length > 4) {
    push();
    rotate(angle);
    branch(length * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(length * 0.67)
    pop();
  }
}
