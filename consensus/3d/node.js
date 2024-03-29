class Node {
  constructor(medium, index) {
    // let x = random(20, width - 20)
    // let y = random(20, height - 20)


    // https://datagenetics.com/blog/january32020/index.html
    let theta = random(0,TWO_PI);
    let v = random(0,1);
    let phi = Math.acos((2*v)-1);
    let r = Math.pow(random(0,1), 1/3);
    r = r * axisLength;
    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);

    this.position = createVector(x, y, z)
    

    // this.position = createVector(x, y)
    this.medium = medium;
    this.index = index;

    this.diameter = 20;
    this.color = randomColor()

    this.messageBuffer = []

    this.isRunning;

    this.counter = 0;

    this.direction = createVector();
    this.speed = 2;
  }

  async run() {
    let next = randomRecepient();

    if (this.index == 0) {
      this.reliableMulticast(next.index)
    }   
  }

  async reliableMulticast(message) {

    for (let i = 0; i < nodeList.length; i++) {
      if (i != this.index) {
        this.medium.send(this, nodeList[i], message)
      }
    }
  } 

  async receive(message) {
    if (message.message == this.index) {
      this.counter += 1;

      if (this.counter == nodeList.length - 1) {
        let next = randomRecepient();

        this.reliableMulticast(next.index);

        this.counter = 0;
      }
    }
    else {
      this.medium.send(this, nodeList[message.message], message.message);
    }
  }

  display() {
    // fill(this.color)
    // noStroke()
    // ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
    this.color.setAlpha(200)
    push()
    // stroke(this.color)
    // strokeWeight(this.diameter)
    
    fill(this.color)
    noStroke()
    translate(this.position)
    sphere(this.diameter / 2)
    // point(this.position.x, this.position.y, this.position.z)
    pop()
    this.color.setAlpha(255)
  }

  move() {
    let rateOfChange = 0.01;

    if (random(0,1) < 0.5) {
      this.direction.x += random(-rateOfChange, rateOfChange);
    }

    else {
      this.direction.y += random(-rateOfChange, rateOfChange);
    }

    this.direction.normalize().mult(this.speed);

    this.position.add(this.direction);


    // this.x += this.direction.x * this.speed;
    // this.y += this.direction.y * this.speed;

    if (this.position.x <= 0 || this.position.x >= width) {
      this.direction = createVector(-this.direction.x, this.direction.y)
    }

    if (this.position.y <= 0 || this.position.y >= height) {
      this.direction = createVector(this.direction.x, -this.direction.y)
    }
  }
}




