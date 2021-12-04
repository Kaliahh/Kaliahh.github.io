class Connection {
  constructor(source, target) {
    this.source = source;
    this.target = target;

    this.lerpStep = 0.02

    this.beginning = 0.0
    this.end = 0.0;

    this.timer = 0.0;
    this.timerStep = this.lerpStep / 4;

    this.connected = false;
    this.disconnected = false;

    this.connecting = true;
    this.disconnecting = false;

    this.color = source.color;

    this.strength = 1
  }


  display() {
    this.preDraw()

  
    if (this.connecting) {
      this.drawConnectionTo(this.end)
    }
    else if (this.beginning > 0) {
      this.drawConnectionFrom(this.beginning)
    }
    else {
      this.drawConnection();
    }

    this.postDraw()
  }

  connect() {
    this.timer += this.timerStep;

    this.connecting = true;

    if (this.end >= 1) {
      this.connected = true;
      this.connecting = false;
    }
    else {
      this.end += this.lerpStep;
    }

    return this.connected;
  }

  disconnect() {
    this.timer += this.timerStep;

    this.disconnecting = true;
    
    if (this.beginning >= 1) {
      this.disconnected = true;
      this.disconnecting = false;
    }
    else {
      let a = (1 - this.timer) / this.timerStep;
      let b = 1 / this.lerpStep;

      if (a - b <= 0) {
        if (this.beginning < 1) {
          this.beginning += this.lerpStep;
        }
      }
    }

    return this.disconnected;
  }

  preDraw() {
    noFill()
    let alpha = map(this.strength, 0, 1, 20, 100);
    this.color.setAlpha(alpha);
    stroke(this.color);
    let weight = map(this.strength, 0, 1, 4, 10);
    strokeWeight(weight);
  }

  postDraw() {
    this.color.setAlpha(255);
  }

  strengthenConnection(value) {
    if (value == null) {
      this.strength += 0.1;
    }
    else {
      this.strength += value;
    }
  }

  transmit(message, recepient) {
    if (this.connected) {
      if (recepient == this.source || recepient == this.target) {
        recepient.receive(message);
      }
      else {
        console.log("Recepient not in connection")
      }
    }
    else {
      console.log("Not connected")
    }
  }
}


class LinearConnection extends Connection {
  constructor(source, target) {
    super(source, target);
  }

  drawConnection() {
    drawLine(this.source.position, this.target.position)
  }

  drawConnectionFrom(value) {
    let pos = this.getPosition(value);
    drawLine(pos, this.target.position)
  }

  drawConnectionTo(value) {
    let pos = this.getPosition(value);
    drawLine(pos, this.source.position)
  }

  getPosition(value) {
    return p5.Vector.lerp(this.source.position, this.target.position, value);
  }
}

class CurvedConnection extends Connection {
  constructor(source, target) {
    super(source, target);

    this.lerpPointOne = this.findControlPoint();
    this.lerpPointTwo = this.findControlPoint();
  }
  
  drawConnection() {
    drawBezier(this.source.position, this.lerpPointOne, this.lerpPointTwo, this.target.position);
  }

  drawConnectionFrom(t) {
    let split = this.splitBezierAt(t);

    drawBezier(split.from[0], split.from[1], split.from[2], split.from[3]);
  }

  drawConnectionTo(t) {
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