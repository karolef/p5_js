function Graph() {
  this.nodes = [];
  this.graph = {};
  this.start = null;
  this.end = null;
}

Graph.prototype.reset = function() {
  for (let i =0; i <this.nodes.length; i++){
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
}

Graph.prototype.setStart = function(specimen) {
  this.start = this.graph[specimen];
  return this.start;
}

Graph.prototype.setEnd = function(specimen) {
  this.end = this.graph[specimen];
  return this.end;
}

Graph.prototype.addNode = function(node) {
  //node into array
  this.nodes.push(node);
  let country = node.value;
  // node into a #table
  this.graph[country] = node;
}

Graph.prototype.getNode = function(specimen) {
  let node = this.graph[specimen];
  return node;
}
