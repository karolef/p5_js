let textfield;
let output;
let submit;

function setup() {
  noCanvas();
  textfield = select("#input");
  output = select("#output");
  submit = select("#submit");
  submit.mousePressed(newText);
}

function highlight() {
  console.log(this.html());
  this.html('snowflake');
  let col = color(random(255), random(255), random(255), 100);
  this.style('background-color', col);
}

function newText() {
  let s = textfield.value();
  let words = s.split(/(\W+)/);
  console.log(words);
  for (let i = 0; i < words.length; i++) {
    let span = createSpan(words[i]);
    span.parent(output);
    if (!/\W+/.test(words[i])) {
      let col = color(random(255), 0, random(255), 100);
      span.style('background-color', col);
      span.mouseOver(highlight);
    }
  }
}
