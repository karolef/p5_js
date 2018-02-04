let afinn;

function preload() {
  afinn = loadJSON('afinn-111.json');
}

function setup() {
  noCanvas();
  let txt = select('#txt');
  txt.input(typing);

  function typing() {
    let textInput = txt.value();
    let words = textInput.split(/\W/);
    let scoredwords = [];
    let totalScore = 0;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        let score = afinn[word];
        totalScore += Number(score);
        scoredwords.push(word + ': ' + score + ' ');
      }
    }
    let scoreP = select('#score');
    scoreP.html('score: ' + totalScore);
    let comp = select('#comparative');
    comp.html('comparative: ' + totalScore / words.length);
    let wordlist = select('#wordlist');
    wordlist.html(scoredwords);
  }
}
