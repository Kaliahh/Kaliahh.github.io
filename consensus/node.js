class Node {
  constructor(medium, index) {
    let x = random(20, width - 20)
    let y = random(20, height - 20)
    

    this.position = createVector(x, y)
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
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
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




