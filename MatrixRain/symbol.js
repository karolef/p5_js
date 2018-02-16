function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.first = first;
  this.opacity = opacity;
  this.switchInterval = round(random(2, 20));

  this.setToRandomSymbol = function() {
    let charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // katakana in unicode
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // numeric
        this.value = round(random(0, 9));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}
