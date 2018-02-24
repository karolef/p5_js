class Particle {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.velX = random(-width, width);
    this.velY = random(-height, height);
    this.alpha = 255;
    this.col = random(0,255);
  }

  show() {
    noStroke();
    fill(this.col, this.alpha, this.alpha);
    ellipse(this.x, this.y, 8);
  }

  update() {
    this.x += this.velX/150;
    this.y += this.velY/150;
    this.alpha -= 4;
  }

  invisible() {
    return this.alpha < 0;
  }
}
