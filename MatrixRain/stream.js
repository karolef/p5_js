function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(8, 32));
  this.speed = random(4, 16);

  this.generateSymbols = function(x, y) {
    let first = round(random(0, 3)) == 1;
    let opacity = 255;
    for (let i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(180, 255, 180, symbol.opacity);
      } else {
        fill(0, 225, 75, symbol.opacity);
      }
      textStyle(BOLD);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
