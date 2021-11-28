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

    this.preview = 0;
    this.previewStep = 0.03;
    this.closing = 0;
  }

  moveTowardsTarget() {

    this.isCurving = true;

    this.curvedMovement()
    // this.linearAccMovement()
    // this.linearConstMovement()
  }

  // Bézier Curve
  curvedMovement() {
    // let a = p5.Vector.lerp(this.source.position, this.lerpPointOne, this.lerpFactor);
    // let b = p5.Vector.lerp(this.lerpPointOne, this.lerpPointTwo, this.lerpFactor);
    // let c = p5.Vector.lerp(this.lerpPointTwo, this.target.position, this.lerpFactor);

    // let d = p5.Vector.lerp(a, b, this.lerpFactor)
    // let e = p5.Vector.lerp(b, c, this.lerpFactor)

    // this.position = p5.Vector.lerp(d, e, this.lerpFactor);


    let t = this.lerpFactor;

    let a =      Math.pow(-t, 3) + 3 * Math.pow(t, 2) - 3 * t + 1;
    let b =  3 * Math.pow(t,  3) - 6 * Math.pow(t, 2) + 3 * t;
    let c = -3 * Math.pow(t,  3) + 3 * Math.pow(t, 2);
    let d =      Math.pow(t,  3);
    
    let v1 = p5.Vector.mult(this.source.position, a);
    let v2 = p5.Vector.mult(this.lerpPointOne, b);
    let v3 = p5.Vector.mult(this.lerpPointTwo, c);
    let v4 = p5.Vector.mult(this.target.position, d);

    this.position = v1.add(v2).add(v3).add(v4);


    

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

  display() {
    rectMode(CENTER)
    fill(this.color)
    noStroke()
    
    let vec = this.getDerived();

    let rotation = vec.heading();

    push();

    translate(this.position);
    rotate(rotation + (PI /2));

    triangle(0, -this.radius / 2, this.radius / 2, this.radius / 2, -this.radius / 2, this.radius / 2)
    // rect(0, 0, this.radius, this.radius)

    pop();
  }

  getDerived() {
    let t = this.lerpFactor;

    let a = -3 * Math.pow(t, 2) + 6 * t - 3;
    let b = 9 * Math.pow(t, 2) - 12 * t + 3;
    let c = -9 * Math.pow(t, 2) + 6 * t;
    let d = 3 * Math.pow(t, 2);

    let v1 = p5.Vector.mult(this.source.position, a);
    let v2 = p5.Vector.mult(this.lerpPointOne, b);
    let v3 = p5.Vector.mult(this.lerpPointTwo, c);
    let v4 = p5.Vector.mult(this.target.position, d);

    let vec = v1.add(v2).add(v3).add(v4);

    vec.normalize();

    return vec;
  }

  // Calculate constant speed 
      // https://gamedev.stackexchange.com/questions/14985/determine-arc-length-of-a-catmull-rom-spline-to-move-at-a-constant-speed/14995#14995

  displayPath() {
    noFill()
    this.color.setAlpha(30)
    stroke(this.color)
    strokeWeight(10)

    if (this.preview < 1) {
      this.drawBezierBetween(this.lerpFactor, this.preview);

      this.preview += this.previewStep
    }
    else {
      this.drawBezierBetween(this.lerpFactor, 1);
    }

    // TODO: Animate closing path

    // if (this.preview < 1) {
    //   this.drawBezierBetween(0, this.preview);
      
    //   this.preview += this.previewStep;
    // }
    // else {
    //   let a = (1 - this.lerpFactor) / this.lerpStep;
    //   let b = (1 - this.lerpFactor) / this.previewStep;

    //   if (a <= b) {
    //     this.drawBezierBetween(this.closing, 1);

    //     if (this.closing < 1) {
    //       this.closing += this.previewStep
    //     }
    //   }
    //   else {
    //     this.drawBezierBetween(0, 1);
    //   }
    // }


    // else if (this.lerpFactor < 0.87) {
    //   this.drawBezierBetween(0, 1);
    // }
    // else {
    //   this.drawBezierBetween(this.closing, 1);
      
    //   if (this.closing < 1) {
    //     this.closing += 0.04;
    //   }
    // }

    // line(this.position.x, this.position.y, this.target.position.x, this.target.position.y)
    
    this.color.setAlpha(255)
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

  // Problem: Draw to preview leaves a bit between the message and source.
  // Solution: Only draw bezier curve between this.lerpFactor and this.preview
  // Look at this: https://stackoverflow.com/questions/878862/drawing-part-of-a-b%C3%A9zier-curve-by-reusing-a-basic-b%C3%A9zier-curve-function
  drawBezierBetween(t0, t1) {
    let u0 = 1.0 - t0;
    let u1 = 1.0 - t1;

    let p1 = this.source.position.copy();
    let p2 = this.lerpPointOne.copy();
    let p3 = this.lerpPointTwo.copy();
    let p4 = this.target.position.copy();

    let ra1 = p5.Vector.mult(p1, u0 * u0)
    let ra2 = p5.Vector.mult(p2, 2 * t0 * u0)
    let ra3 = p5.Vector.mult(p3, t0 * t0);

    let qa = ra1.add(ra2).add(ra3);

    let rb1 = p5.Vector.mult(p1, u1 * u1);
    let rb2 = p5.Vector.mult(p2, 2 * t1 * u1);
    let rb3 = p5.Vector.mult(p3, t1 * t1);

    let qb = rb1.add(rb2).add(rb3);

    let rc1 = p5.Vector.mult(p2, u0 * u0);
    let rc2 = p5.Vector.mult(p3, 2 * t0 * u0);
    let rc3 = p5.Vector.mult(p4, t0 * t0);

    let qc = rc1.add(rc2).add(rc3);    

    let rd1 = p5.Vector.mult(p2, u1 * u1);
    let rd2 = p5.Vector.mult(p3, 2 * t1 * u1);
    let rd3 = p5.Vector.mult(p4, t1 * t1);

    let qd = rd1.add(rd2).add(rd3);    

    let s0 = p5.Vector.mult(qa, u0).add(p5.Vector.mult(qc, t0));
    let s1 = p5.Vector.mult(qa, u1).add(p5.Vector.mult(qc, t1));
    let s2 = p5.Vector.mult(qb, u0).add(p5.Vector.mult(qd, t0));
    let s3 = p5.Vector.mult(qb, u1).add(p5.Vector.mult(qd, t1));

    drawBezier(s0, s1, s2, s3);
  }
}