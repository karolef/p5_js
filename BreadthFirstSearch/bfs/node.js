// node:
// value
// edges =[];
// boolean wheather it was searched
// parent

function Node(value) {
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}


Node.prototype.addEdge = function(neighbor) {
  // edges go in both directions
  this.edges.push(neighbor);
  neighbor.edges.push(this);
}
