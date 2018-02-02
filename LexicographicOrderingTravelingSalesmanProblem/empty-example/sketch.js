let cities = [];
let totalCities = 7;
let order = [];
let totalPermutations;
let count = 1;
let recordDist;
let bestOrder;

function setup() {
  createCanvas(400, 600);
  for (let i = 0; i < totalCities; i++) {
    let rVector = createVector(random(width), random(height / 2));
    cities[i] = rVector;
    order[i] = i;
  }
  let d = calcDist(cities, order);
  recordDist = d;
  bestOrder = order.slice();
  totalPermutations = factorial(totalCities);
  // console.log(totalPermutations);
}

function draw() {
  // frameRate(5);
  background(50);
  // cities and current best order (path)
  stroke(0, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = bestOrder[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  endShape();

  // mirrored cities and testing permutations
  translate(0, height / 2);
  stroke(255, 0, 0);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  endShape();

  let d = calcDist(cities, order);
  if (d < recordDist) {
    recordDist = d;
    bestOrder = order.slice();
  }

  let permutation = '';
  for (let i = 0; i < order.length; i++) {
    permutation += order[i];
  }
  fill(255);
  textSize(15);
  // text('permutation:' + permutation, 5, height / 2 - 8);
  let percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 2) + '% completed, total permutations: ' + totalPermutations, 5, height / 2 - 8);
  nextOrder();
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

// lexicographic order algorithm
function nextOrder() {
  count++;
  // STEP 1 of the algorithm
  let largestI = -1;
  for (let i = 0; i < order.length; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }
  // console.log('largestI', largestI);
  // STEP 2
  largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }
  // console.log('largestJ', largestJ);
  // STEP 3
  swap(order, largestI, largestJ);
  // STEP 4
  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
