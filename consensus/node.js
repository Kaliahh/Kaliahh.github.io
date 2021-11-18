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
  }

  async run() {
    // this.isRunning = true;

    // while (this.isRunning) {
    //   await sleep(100)
    // }

    let next = randomRecepient();

    if (this.index == 0) {
      this.multicast(next.index)
    }

    // TODO: Hvis mit index er i beskeden, så er det mig der multicaster næste gang.

    // this.receive("a")
    // this.receive("a")
    
  }

  async multicast(message) {

    for (let i = 0; i < nodeList.length; i++) {
      if (i != this.index) {
        this.medium.send(this, nodeList[i], message)
      }
    }
  } 

  async receive(message) {
    if (message.message == this.index && message.message != -1) {
      this.counter += 1;
      console.log(this.counter)

      if (this.counter == nodeList.length - 1) {
        let next = randomRecepient();

        this.multicast(next.index);
      }
    }
    else if (message.message == this.index && message.message == -1) {
      console.log("First one")
    }
    else if (message.message != this.index && message.message == -1) {
      console.log("Second one")
    }
    else if (message.message != this.index && message.message != -1) {
      this.medium.send(this, nodeList[message.message], message.message);
    }
    else {
      console.log("Last one")
    }


    // let recepient = randomRecepient(this.index);

    // this.medium.send(this, recepient, Math.floor(random() * 100));

    // console.log(message.message)
  }

  display() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
  }
}




