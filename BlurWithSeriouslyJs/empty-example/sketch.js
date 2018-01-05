let video;
let slider;

function setup() {
  canvas = createCanvas(640, 480, WEBGL);
  canvas.id('p5canvas');
  pixelDensity(1);
  background(51);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.id('p5video');
  video.hide();
  slider = createSlider(0,1,0.5, 0.01);
  slider.id('blur-slider');

  let seriously = new Seriously();

  let src = seriously.source('#p5video');
  let target = seriously.target('#p5canvas');

  let blur = seriously.effect('blur');
  blur.amount = '#blur-slider';
  blur.source = src;
  target.source = blur;

  // let chroma = seriously.effect('chroma');
  // chroma.source = src;
  // target.source = chroma;
  // let r = 98 / 255;
  // let g = 175 / 255;
  // let b = 116 / 255;
  // chroma.screen = [r,g,b,1];

  seriously.go();
}
