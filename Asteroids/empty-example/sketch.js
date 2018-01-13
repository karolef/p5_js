let ship;
let asteroids = [];
let lasers = [];

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);


  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('YOU ARE DEAD');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 15) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          } else {
            // do nothing
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
