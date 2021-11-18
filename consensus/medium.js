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

    this.position = createVector(source.position.x, source.position.y);

    this.arrived = false

    this.radius = 10;
    this.color = source.color;
  }

  moveTowardsTarget() {
    // console.log(this.target)
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

  arrive() {
    this.target.receive(this);
  }

  display() {
    rectMode(CENTER)
    fill(this.color)
    noStroke()
    // stroke(0)
    // strokeWeight(2)
    rect(this.position.x, this.position.y, this.radius, this.radius)
  }

  displayPath() {
    this.color.setAlpha(30)
    stroke(this.color)
    strokeWeight(10)
    line(this.position.x, this.position.y, this.target.position.x, this.target.position.y)
    this.color.setAlpha(255)
  }
}

