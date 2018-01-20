// variables: F+-[]
// axiom: F
// rules: F -> F[+F-F+F]F[-F+F-F]

let axiom = "F";
let sentence = axiom;
let length = 100;
let angle;

let rules = [];
rules[0] = {
  a: "F",
  b: "F[+F-F+F]F[-F+F-F]"
}

function generate() {
  length *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(50);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);

  // rule: F -> FF+[+F-F-F]-[-F+F+F]
  // interpreted as a turtle graphics engine
  // F move forward and draw a line
  // + turn right
  // - turn left
  // [ save where you were
  // ] go back to where you were

  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -length);
      translate(0, -length);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  angle = radians(25);
  background(50);
  createP(axiom);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
}
