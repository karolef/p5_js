class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h);
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);

  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    let d = Math.pow((point.x - this.x), 2) +
            Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  intersects(range) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);
    let r = this.r;
    let w = range.w;
    let h = range.h;
    let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
    if (xDist > (r + w) || yDist > (r + h)) {
      return false;
    }
    if (xDist <= w || yDist <= h) {
      return true;
    }
    return edges <= this.rSquared;
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast.insert(point)) {
        return true;
      } else if (this.northwest.insert(point)) {
        return true;
      } else if (this.southeast.insert(point)) {
        return true;
      } else if (this.southwest.insert(point)) {
        return true;
      }
    }
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2,
                           y - h / 2,
                           w / 2,
                           h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(x - w / 2,
                           y - h / 2,
                           w / 2,
                           h / 2);
    this.northwest = new QuadTree(nw, this.capacity);
    let se = new Rectangle(x + w / 2,
                           y + h / 2,
                           w / 2,
                           h / 2);
    this.southeast = new QuadTree(se, this.capacity);
    let sw = new Rectangle(x - w / 2,
                           y + h / 2,
                           w / 2,
                           h / 2);
    this.southwest = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.boundary.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.northwest.query(range, found);
        this.northeast.query(range, found);
        this.southwest.query(range, found);
        this.southeast.query(range, found);
      }
    }
    return found;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x,
         this.boundary.y,
         this.boundary.w * 2,
         this.boundary.h * 2);
    if (this.divided) {
        this.northwest.show();
        this.northeast.show();
        this.southwest.show();
        this.southeast.show();
    }
    for (let p of this.points) {
      strokeWeight(4);
      stroke(50, 200, 255);
      point(p.x, p.y);
    }
  }
}
