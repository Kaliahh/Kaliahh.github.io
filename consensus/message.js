class Message {
  constructor(source, target, message) {
    this.source = source;
    this.target = target;
    this.message = message;

    this.position = createVector(source.position.x, source.position.y);

    this.arrived = false

    this.radius = 10;
    this.color = source.color;

    this.lerpFactor = 0.0;
    this.lerpStep = 0.005;

    this.lerpPointOne = this.findControlPoint()
    this.lerpPointTwo = this.findControlPoint()

    this.isCurving = false;
  }

  moveTowardsTarget() {

    this.isCurving = true;

    this.curvedMovement()
    // this.linearAccMovement()
    // this.linearConstMovement()
  }

  // Bézier Curve
  curvedMovement() {
    let a = p5.Vector.lerp(this.source.position, this.lerpPointOne, this.lerpFactor);
    let b = p5.Vector.lerp(this.lerpPointOne, this.lerpPointTwo, this.lerpFactor);
    let c = p5.Vector.lerp(this.lerpPointTwo, this.target.position, this.lerpFactor);

    let d = p5.Vector.lerp(a, b, this.lerpFactor)
    let e = p5.Vector.lerp(b, c, this.lerpFactor)

    this.position = p5.Vector.lerp(d, e, this.lerpFactor);

    this.lerpFactor += this.lerpStep 

    if (this.lerpFactor >= 1) {
      this.arrived = true;
    }
  }

  // Old non-lerp movement
  linearAccMovement() {
    let vec = this.target.position.copy()
    vec.sub(this.position)
    let fullVec = vec.copy()
    
    if (fullVec.mag() / 100 < 2) {
      fullVec.normalize()
      fullVec.mult(2)
    }
    else {
      fullVec.setMag(fullVec.mag() / 100);
    }

    vec.normalize()

    vec.mult(fullVec.mag())
    this.position.add(vec)

    if (distanceBetweenTwoPoints(this.position, this.target.position) <= 1) {
      this.arrived = true;
    }
  }

  // Linear lerp movement
  linearConstMovement() {
    this.position = p5.Vector.lerp(this.source.position, this.target.position, this.lerpFactor);

    this.lerpFactor += this.lerpStep // + random(-0.003, 0.003);

    if (this.lerpFactor >= 1) {
      this.arrived = true;
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
    
    b.normalize()
     .mult(random(0, p5.Vector.dist(source, target))) // Divide to get a bit less curvature
     .add(a);

    return this.enforceBoundaryMin(b);
  }

  enforceBoundary(vec) {
    let v = vec.copy()
    if (v.x < 0) {
      v.x = 0;
    }
    else if (v.x > width) {
      v.x = width;
    }

    if (v.y < 0) {
      v.y = 0;
    }
    else if (v.y > height) {
      v.y = height;
    }
    return v;
  }

  enforceBoundaryMax(vec) {
    let v = vec.copy()

    if (v.x < 0 || v.x > width) {
      v.x = width;
    }

    if (v.y < 0 || v.y > height) {
      v.y = height;
    }
    
    return v;
  }

  enforceBoundaryMin(vec) {
    let v = vec.copy()

    if (v.x < 0 || v.x > width) {
      v.x = 0;
    }

    if (v.y < 0 || v.y > height) {
      v.y = 0;
    }
    
    return v;
  }

  arrive() {
    this.target.receiveToMulticast(this);
    // this.target.receiveToRandomSingle(this);
  }

  // TODO: This should be an arrowhead or something
  display() {
    rectMode(CENTER)
    fill(this.color)
    noStroke()
    rect(this.position.x, this.position.y, this.radius, this.radius)
  }

  displayPath() {
    noFill()
    this.color.setAlpha(30)
    stroke(this.color)
    strokeWeight(10)

    // TODO: This should only display the part of the curve that is left
    // Maybe this can do it:
    // https://stackoverflow.com/questions/54652588/how-to-draw-an-overlapping-curve-between-two-bezier-points-on-existing-curve-p5
    if (this.isCurving) {
      bezier(this.source.position.x, this.source.position.y,
             this.lerpPointOne.x, this.lerpPointOne.y, 
             this.lerpPointTwo.x, this.lerpPointTwo.y, 
             this.target.position.x, this.target.position.y);
    }
    else {
      line(this.position.x, this.position.y, this.target.position.x, this.target.position.y)
    }
    
    this.color.setAlpha(255)
  }
}