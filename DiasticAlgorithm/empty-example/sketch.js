let sourcetxt;
let words;

function preload(){
  sourcetxt = loadStrings('snowflake.txt');
}

function diastic(seed, words){
  let phrase = "";
  let currentWord = 0;

  for (let i = 0; i<seed.length; i++){
    let c = seed.charAt(i);

    for( let j = currentWord; j <words.length; j++){
      if(words[j].charAt(i) == c){
        phrase += words[j];
        phrase += " ";
        currentWord = j + 1;
        //console.log(words[j]);
        break;
      }
    }
  }
  return phrase;
}

function setup() {
  noCanvas();
  sourcetxt = join(sourcetxt, ' ');
  words = splitTokens(sourcetxt, ' ,!.?');
  let seed = select("#seed");
  let submit = select("#submit");
  submit.mousePressed(function(){
    let phrase = diastic(seed.value(), words);
    createP(phrase);
  });
}
