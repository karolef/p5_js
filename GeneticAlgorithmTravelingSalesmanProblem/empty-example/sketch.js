let cities = [];
let totalCities = 10;
let populationSize = 500;
let population = [];
let fitness = [];
let recordDist = Infinity;
let bestOrder;
let currentOrder;

function setup() {
  createCanvas(600, 600);
  let order = [];
  for (let i = 0; i < totalCities; i++) {
    let rVector = createVector(random(width), random(height / 2));
    cities[i] = rVector;
    order[i] = i;
  }
  for (let i = 0; i < populationSize; i++) {
    population[i] = shuffle(order);
  }
}

function draw() {
  background(50);
  // genetic algorithm
  calcFitness();
  normalizeFitness();
  nextGeneration();
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < bestOrder.length; i++) {
    let n = bestOrder[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  endShape();

  translate(0, height / 2);
  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < currentOrder.length; i++) {
    let n = currentOrder[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  endShape();
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDist(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityAIndex = order[i];
    let cityA = points[cityAIndex];
    let cityBIndex = order[i + 1];
    let cityB = points[cityBIndex];
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
