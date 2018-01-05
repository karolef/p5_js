let video;
let vScale = 16;

let particles = [];

let slider;

function setup(){
  createCanvas(640,480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (let i = 0; i <25; i++){
    particles[i] = new Particle(320,240);
  }
  background(51);
  slider = createSlider(0, 255,127);

}

function draw() {
  video.loadPixels();
  for (let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].show();
  }
}
