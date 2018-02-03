let txt = [];
let counts = {};
let keys = [];
let allwords = [];

let files = ['snowflake.txt', 'bigOnotation.txt', 'djikstrasalgorithm.txt', 'icicle.txt', 'primsalgorithm.txt', 'snow.txt'];

function preload() {
  for (let i = 0; i < files.length; i++) {
    txt[i] = loadStrings('files/' + files[i]);
  }
}

function setup() {
  createCanvas(800, 400);
  background(255);
  for (let i = 0; i < txt.length; i++) {
    allwords[i] = txt[i].join("\n");
  }

  let tokens = allwords[0].split(/\W+/);
  for (let i = 0; i < tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = {
          tf: 1,
          df: 1
        };
        keys.push(word);
      } else {
        counts[word].tf = counts[word].tf + 1;
      }
    }
  }

  let otherCounts = [];
  for (let j = 1; j < allwords.length; j++) {
    let tempCounts = {};
    let tokens = allwords[j].split(/\W+/);
    for (let k = 0; k < tokens.length; k++) {
      let w = tokens[k].toLowerCase();
      if (tempCounts[w] === undefined) {
        tempCounts[w] = true;
      }
    }
    otherCounts.push(tempCounts);
  }

  for (let i = 0; i < keys.length; i++) {
    let word = keys[i];
    for (let j = 0; j < otherCounts.length; j++) {
      let tempCounts = otherCounts[j];
      if (tempCounts[word]) {
        counts[word].df++;
      }
    }
  }

  for (let i = 0; i < keys.length; i++) {
    let word = keys[i];
    let wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }

  keys.sort(compare);

  function compare(a, b) {
    let countA = counts[a].tfidf;
    let countB = counts[b].tfidf;
    return countB - countA;
  }

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    createDiv(key + " " + nf(counts[key].tfidf, 0, 2));
  }

  for (i = 0; i < keys.length; i++) {
    let count = counts[keys[i]].tfidf;
    textSize(count);
    let x = random(width);
    let y = random(height);
    text(keys[i], x, y);
    fill(random(255), 0, random(255), 100);
  }
}
