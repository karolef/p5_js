function Tree() {
  this.leaves = [];
  this.branches = [];

  for (let i = 0; i < 1000; i++) {
    this.leaves.push(new Leaf());
  }

  let position = createVector(width / 2, height);
  let direction = createVector(0, -1);
  let root = new Branch(null, position, direction);
  this.branches.push(root);
  let current = root;
  let found = false;

  while (!found) {
    for (let i = 0; i < this.leaves.length; i++) {
      let d = p5.Vector.dist(current.position, this.leaves[i].position);
      if (d < max_dist) {
        found = true;
      }
    }

    if (!found) {
      let branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }

  this.grow = function() {
    for (let i = 0; i < this.leaves.length; i++) {
      let leaf = this.leaves[i];
      let closestBranch = null;
      let record = 1000000;
      for (let j = 0; j < this.branches.length; j++) {
        let branch = this.branches[j];
        let d = p5.Vector.dist(leaf.position, branch.position);
        if (d < min_dist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (d > max_dist) {

        } else if (closestBranch == null || d < record) {
          closestBranch = branch;
          record = d;
        }
      }

      if (closestBranch != null) {
        let newDirection = p5.Vector.sub(leaf.position, closestBranch.position);
        newDirection.normalize();
        closestBranch.direction.add(newDirection);
        closestBranch.counter++;
      }
    }

    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    for (let i = this.branches.length - 1; i >= 0; i--) {
      let branch = this.branches[i];
      if (branch.counter > 0) {
        branch.direction.div(branch.counter+1);
        this.branches.push(branch.next());
      }
      branch.reset();
    }
  }

  this.show = function() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }
    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }
  }
}
