// 3 inputs
// all inputs go into each hidden node - 3 in this case
// processed by the hidden nodes
// each hidden node connects to every output - 2 in this case
// processed by the outputs and return results - 2 in this case

let r, g, b;
let neuralN;
let decision = "black";

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function setup() {
  createCanvas(600, 300);
  noLoop();
  neuralN = new NeuralNetwork(3, 3, 2);

  for (let i = 0; i < 10000; i++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let targets = trainColor(r, g, b);
    let inputs = [r / 255, g / 255, b / 255];
    neuralN.train(inputs, targets);
  }
  pickColor();
}

function mousePressed() {
  // let targets; //target outputs
  // if ( mouseX > width/2){
  //   targets = [1,0];
  // } else {
  //   targets = [0,1];
  // }
  // let inputs = [r / 255, g / 255, b / 255];
  // neuralN.train(inputs, targets);
  pickColor();
}

function colorPredictor(r, g, b) {
  console.log(floor(r + g + b));
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = neuralN.predict(inputs);
  // console.log(outputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }

  // if (r+g+b > 300){
  //   return "black";
  // } else {
  //   return "white";
  // }
}

function trainColor(r, g, b) {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}

function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 100);
  fill(255);
  text("white", 450, 100);

  let decision = colorPredictor(r, g, b);
  if (decision === "black") {
    fill(0);
    ellipse(150, 200, 60);
  } else {
    fill(255);
    ellipse(450, 200, 60);
  }
}
