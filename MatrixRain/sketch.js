let symbolSize = 16;
let streams = [];
let fadeInterval = 1.2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-height, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textFont('Poplar Std Bold');
  textSize(symbolSize);
}

function draw() {
  background(0, 125);
  streams.forEach(function(stream) {
    stream.render();
  });
}
