let data;
let graph;
let dropdown;

function preload() {
  data = loadJSON('data.json');
}

function setup() {
  noCanvas();
  dropdown = createSelect();
  dropdown.changed(BreadthFirstSearch);
  graph = new Graph();
  let countries = data.country;
  for (let i = 0; i < countries.length; i++) {
    var country = countries[i].CountryName;
    var animals = countries[i].AnimalCommon;
    let countryNode = new Node(country);
    graph.addNode(countryNode);
    for (let j = 0; j < animals.length; j++) {
      let specimen = animals[j];
      let animalNode = graph.getNode(specimen);
      if (animalNode == undefined) {
        animalNode = new Node(specimen);
        dropdown.option(specimen);
      }
      graph.addNode(animalNode);
      countryNode.addEdge(animalNode);
    }
  }
}

// Breadth First Search
function BreadthFirstSearch() {
  graph.reset();
  let start = graph.setStart(dropdown.value());
  let end = graph.setEnd("Asian water buffalo");
  let queue = [];
  start.searched = true;
  queue.push(start);
  while (queue.length > 0) {
    let current = queue.shift();
    if (current == end) {
      console.log("Found " + current.value);
      break;
    }
    let edges = current.edges;
    for (let i = 0; i < edges.length; i++) {
      let neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  // the path the algorithm took
  let path = [];
  path.push(end);
  let next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  let txt = '';
  for (let i = path.length - 1; i >= 0; i--) {
    let node = path[i];
    txt += node.value;
    if (i != 0) {
      txt += ' ---> ';
    }
  }
  createP(txt);
}
