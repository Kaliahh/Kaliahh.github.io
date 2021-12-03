class Connection {
  constructor(source, target) {
    this.source = source;
    this.target = target;
    this.currentPosition = this.source.position.copy()

    this.lerpStep = 0.02

    this.beginning = 0.0
    this.end = 0.0;

    this.connected = false;
    this.connectionEnded = false;

    this.color = source.color;

    this.strength = 0.1 // Map between 0 and 1, to 0 and 255 for opacity
  }

  drawPrerequisites() {
    noFill()
    let alpha = map(this.strength, 0, 1, 0, 255);
    this.color.setAlpha(alpha);
    stroke(this.color);
    let weight = map(this.strength, 0, 1, 1, 10);
    strokeWeight(weight);
  }

  strengthenConnection(value) {
    if (value == null) {
      this.strength += 0.1;
    }
    else {
      this.strength += value;
    }
  }
}


class LinearConnection extends Connection {
  constructor(source, target) {
    super(source, target);
  }

  // TODO: connect and disconnect should not draw anything

  connect() {
    if (this.end >= 1) {
      this.connected = true;
    }
    else {
      this.linearConnection(this.end);

      this.end += this.lerpStep;
    }

    return this.connected;
  }

  disconnect() {
    if (this.beginning >= 1) {
      this.connectionEnded = true;
    }
    else {
      this.linearConnection(this.beginning);

      this.beginning += this.lerpStep;
    }

    return this.connectionEnded;
  }

  linearConnection(lerpValue) {
    this.currentPosition = p5.Vector.lerp(this.source.position, this.target.position, lerpValue);

    if (lerpValue == this.end) {
      this.drawLineBetween(this.source.position, this.currentPosition);
    }
    else if (lerpValue == this.beginning) {
      this.drawLineBetween(this.target.position, this.currentPosition);
    }
    else {
      console.log("This should not happen");
    }
  }

  drawLineBetween(a, b) {
    this.drawPrerequisites()

    drawLine(a, b);
  }
}

class CurvedConnection extends Connection {
  constructor(source, target) {
    super(source, target);

    this.lerpPointOne = this.findControlPoint();
    this.lerpPointTwo = this.findControlPoint();
  }


  connect() {

  }

  disconnect() {

  }

  drawMyBezier() {
    drawBezier(this.source.position, this.lerpPointOne, this.lerpPointTwo, this.target.position);
  }

  drawBezierFrom(t) {
    let split = this.splitBezierAt(t);

    drawBezier(split.from[0], split.from[1], split.from[2], split.from[3]);
  }

  drawBezierTo(t) {
    let split = this.splitBezierAt(t) 

    drawBezier(split.to[0], split.to[1], split.to[2], split.to[3]);
  }

  splitBezierAt(t) {
    let p1 = this.source.position.copy();
    let p2 = this.lerpPointOne.copy();
    let p3 = this.lerpPointTwo.copy();
    let p4 = this.target.position.copy();

    let a1 = p5.Vector.sub(p2, p1).mult(t).add(p1);
    let a2 = p5.Vector.sub(p3, p2).mult(t).add(p2);
    let a3 = p5.Vector.sub(p4, p3).mult(t).add(p3);

    let q1 = p5.Vector.sub(a2, a1).mult(t).add(a1);
    let q2 = p5.Vector.sub(a3, a2).mult(t).add(a2);

    let s0 = p5.Vector.sub(q2, q1).mult(t).add(q1);

    return {
      to: [p1, a1, q1, s0],
      from: [s0, q2, a3, p4]
    }
  }

  findControlPoint() {
    let source = this.source.position
    let target = this.target.position

    let a = p5.Vector.lerp(source, target, random());
    
    // Choose true if you want a fountain
    // Choose false if you want sort of grass or roots
    let b = (random() <= 0.5) ? createVector(a.y, -a.x) 
                              : createVector(-a.y, a.x);
    
    do {
      b.normalize()
      .mult(random(0, p5.Vector.dist(source, target))) // Divide to get a bit less curvature
      .add(a);
    } while (!this.isWithinBoundary(b))

    return b;
  }

  isWithinBoundary(vec) {
    return vec.x > 0 && vec.x < width && vec.y > 0 && vec.y < height;
  }
}