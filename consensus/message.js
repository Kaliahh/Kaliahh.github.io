class Message {
  constructor(source, target, message) {
    this.source = source;
    this.target = target;
    this.message = message;

    this.position = source.position.copy()

    this.arrived = false

    this.radius = 10;
    this.color = source.color;

    this.lerpFactor = 0.0;
    this.lerpStep = 0.005;

    this.connection = new LinearConnection(source, target);
  }

  moveTowardsTarget() {

    if (this.connection.connected == false) {
      this.connection.connect()
    }
    else if (this.connection.disconnected == false) {
      this.connection.disconnect()
    }
    else {
      
      this.arrived = true;
    }

    this.linearConstMovement()
  }

  // Bézier Curve
  curvedMovement() {
    if (this.lerpFactor >= 1) {
      this.arrived = true;
    }

    let a = p5.Vector.lerp(this.source.position, this.lerpPointOne, this.lerpFactor);
    let b = p5.Vector.lerp(this.lerpPointOne, this.lerpPointTwo, this.lerpFactor);
    let c = p5.Vector.lerp(this.lerpPointTwo, this.target.position, this.lerpFactor);

    let d = p5.Vector.lerp(a, b, this.lerpFactor)
    let e = p5.Vector.lerp(b, c, this.lerpFactor)

    this.position = p5.Vector.lerp(d, e, this.lerpFactor);

    this.lerpFactor += this.lerpStep 
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
    // this.position = p5.Vector.lerp(this.source.position, this.target.position, this.lerpFactor);
    let vec = p5.Vector.lerp(this.source.position, this.target.position, this.lerpFactor);
    this.position = p5.Vector.lerp(vec, this.target.position, this.lerpFactor)

    this.lerpFactor += this.lerpStep 

    if (this.lerpFactor >= 1) {
      this.arrived = true;
    }
  }
  
  arrive() {
    // this.target.receiveToMulticast(this);
    this.target.receiveToRandomSingle(this);
  }

  display() {
    rectMode(CENTER)
    fill(this.color)
    noStroke()
    
    // let vec = this.getDerived();

    // let rotation = vec.heading();

    // push();

    // translate(this.position);
    // rotate(rotation + (PI /2));

    // triangle(0, -this.radius / 2, this.radius / 2, this.radius / 2, -this.radius / 2, this.radius / 2)
    
    // pop();
    rect(this.position.x, this.position.y, this.radius, this.radius)
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

  displayConnection() {
    this.connection.display();
  }

}