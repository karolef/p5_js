let particles = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);
  let boundary = new Rectangle(width/2, height/2, width, height);
  let qtree = new QuadTree(boundary, 4);
  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
    p.move();
    p.render();
    p.setHighlight(false);
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r*2);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
    // for (let other of particles){
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true);
      }
    }
  }
}
