let cities = [];
let totalCities = 5;
let recordDist;
let bestDist;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < totalCities; i++) {
    let rVector = createVector(random(width), random(height));
    cities[i] = rVector;
  }

  let d =calcDist(cities);
  recordDist = d;
  bestDist = cities.slice();

}

function draw() {
  background(50);
  fill(255);
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(255,0,255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < cities.length; i++) {
    vertex(bestDist[i].x, bestDist[i].y);
  }
  endShape();





  let i=floor(random(cities.length));
  let j=floor(random(cities.length));
  swap(cities,i,j);

  let d = calcDist(cities);
  if (d<recordDist){
    recordDist=d;
    bestDist = cities.slice();
  }
}

function swap(a, i, j){
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDist(points) {
  let sum = 0;
  for (let i = 0; i<points.length-1; i++){
    let d= dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum +=d;
  }
  return sum;
}
