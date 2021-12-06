class Node {
  constructor(medium, index, x, y) {

    if (x == null || y == null) {
      x = random(20, width - 20)
      y = random(20, height - 20)
    }
    
    this.neighborhood = [];

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
    // if (this.index == 0) {
    //   let next = randomRecepient(this.index, this.neighborhood);
    //   if (!nullOrUndefined(next)) {
    //     this.reliableMulticast(next.index, this.neighborhood)
    //   }
    // }   

    if (this.index % 2 == 0) {
      let next = randomRecepient(this.index, this.neighborhood);
      if (!nullOrUndefined(next)) {
        await sleep(getRandomInt(100, 1000))
        this.medium.send(this, next, "");
      }
    }
  }

  async reliableMulticast(message, recepients) {
    console.log(recepients)

    for (let i = 0; i < recepients.length; i++) {
      if (i != this.index) {
        this.medium.send(this, recepients[i], message)
        await sleep(1)
      }
    }
  } 

  async receiveToMulticast(message) {
    if (message.message == this.index) {
      this.counter += 1;

      // let k = grid.getAmount()

      if (this.counter == this.neighborhood.length - 1) {
        let next = randomRecepient(this.index, this.neighborhood);

        this.reliableMulticast(next.index, this.neighborhood);

        this.counter = 0;
      }
    }
    else {
      this.medium.send(this, this.neighborhood[message.message], message.message);
    }
  }

  async receiveToRandomSingle(message) {
    let next;

    do {
      next = randomRecepient(this.index, this.neighborhood);
    } while (next == message.source)

    if (!nullOrUndefined(next)) {
      await sleep(getRandomInt(100, 1000))
      this.medium.send(this, next, message.message);
    }
  }

  async receiveToRandomNeighbor(message) {

  }

  setNeighborhood(neighborhood) {
    this.neighborhood = neighborhood;
  }

  addToNeighborhood(node) {
    if (this.neighborhood.indexOf(node) == -1) {
      this.neighborhood.push(node)
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

    if (this.position.x <= 0 || this.position.x >= width) {
      this.direction = createVector(-this.direction.x, this.direction.y)
    }

    if (this.position.y <= 0 || this.position.y >= height) {
      this.direction = createVector(this.direction.x, -this.direction.y)
    }
  }
}


class GridNode extends Node {
  constructor(medium, index, positionX, positionY, x, y) {
    super(medium, index, positionX, positionY)

    this.x = x;
    this.y = y;

    this.connections = []

  }

  // async receive(message) {

  // }

  // async run() {

  // }
}




