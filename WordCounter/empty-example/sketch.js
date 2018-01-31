let txt;
let counts = {};
let keys = [];

function preload() {
  txt = loadStrings("snowflake.txt");
}

function setup() {
  createCanvas(800, 400);
  background(255);
  let allwords = txt.join("\n");
  let tokens = allwords.split(/\W+/);
  // console.log(tokens);
  for (let i = 0; i < tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }
  // console.log(counts);
  keys.sort(compare);

  function compare(a, b) {
    let countA = counts[a];
    let countB = counts[b];
    return countB - countA;
  }
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    createDiv(keys[i] + " " + counts[key]);
  }

  for (i = 0; i < keys.length; i++) {
    let count = counts[keys[i]];
    textSize(count);
    let x = random(width);
    let y = random(height);
    text(keys[i], x, y);
    fill(random(255),0,random(255),100);
  }
}
