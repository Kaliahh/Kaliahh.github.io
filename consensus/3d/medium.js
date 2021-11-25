class Medium {
  constructor() {
    this.messageList = []
  }

  async send(source, target, message) {
    this.messageList.push(new Message(source, target, message))
  }

  async update() {
    for (let i = 0; i < this.messageList.length; i++) {
      this.messageList[i].moveTowardsTarget();

      if (this.messageList[i].arrived) {        
        let message = this.messageList.splice(i, 1)[0];

        message.arrive();

        if (this.messageList.length == 0) {
          this.messageList = []
        }
      }
    }
  }
}


class Message {
  constructor(source, target, message) {
    this.source = source;
    this.target = target;
    this.message = message;

    this.position = createVector(source.position.x, source.position.y, source.position.z);

    this.arrived = false

    this.radius = 10;
    this.color = source.color;

    this.lerpFactor = 0.0;
    this.lerpStep = 0.005;

    this.lerpPointOne = createVector(random(-axisLength, axisLength), 
                                     random(-axisLength, axisLength),
                                     random(-axisLength, axisLength));

    this.lerpPointTwo = createVector(random(-axisLength, axisLength), 
                                     random(-axisLength, axisLength),
                                     random(-axisLength, axisLength));
  }

  moveTowardsTarget() {
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

  linearConstMovement() {
    this.position = p5.Vector.lerp(this.source.position, this.target.position, this.lerpFactor);

    this.lerpFactor += this.lerpStep + random(-0.003, 0.003);

    if (this.lerpFactor >= 1) {
      this.arrived = true;
    }
  }

  arrive() {
    this.target.receive(this);
  }

  display() {
    // rectMode(CENTER)
    // fill(this.color)
    // noStroke()
    // // stroke(0)
    // // strokeWeight(2)
    // rect(this.position.x, this.position.y, this.radius, this.radius)
    push()
    fill(this.color)
    translate(this.position)
    stroke(0)
    strokeWeight(0.5)
    box(this.radius)
    pop()
  }

  displayPath() {
    this.color.setAlpha(30)
    stroke(this.color)
    strokeWeight(10)
    noFill()
    // drawLine(this.position, this.target.position)

    bezier(this.source.position.x, this.source.position.y, this.source.position.z,
      this.lerpPointOne.x, this.lerpPointOne.y, this.lerpPointOne.z,
      this.lerpPointTwo.x, this.lerpPointTwo.y, this.lerpPointTwo.z,
      this.target.position.x, this.target.position.y, this.target.position.z);

    this.color.setAlpha(255)
  }
}

