let txt = "A snowflake is a single ice crystal that has achieved a sufficient size, and may have amalgamated with others, then falls through the Earth's atmosphere as snow. Each flake nucleates around a dust particle in supersaturated air masses by attracting supercooled cloud water droplets, which freeze and accrete in crystal form. Complex shapes emerge as the flake moves through differing temperature and humidity zones in the atmosphere, such that individual snowflakes differ in detail from one another, but may be categorized in eight broad classifications and at least 80 individual variants. The main constituent shapes for ice crystals, from which combinations may occur, are needle, column, plate and rime. Snow appears white in color despite being made of clear ice. This is due to diffuse reflection of the whole spectrum of light by the small crystal facets of the snowflakes."
let order = 3;
let ngrams = {};
let button;

function setup() {
  noCanvas();
  createP(txt);
  for (let i = 0; i <= txt.length - order; i++) {
    let gram = txt.substring(i, i + order);
    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.charAt(i + order));
  }
  button = createButton("Generate");
  button.mousePressed(markovChain);
  // console.log(ngrams);
}

function markovChain() {
  let currentGram = txt.substring(0, order);
  let result = currentGram;

  for (let i = 0; i < 50; i++) {
    let possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    let next = random(possibilities);
    result += next;
    let length = result.length;
    currentGram = result.substring(length - order, length);
  }
  createP(result);
}
