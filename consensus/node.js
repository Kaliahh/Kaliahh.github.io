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
  }

  async run() {
    // this.isRunning = true;

    // while (this.isRunning) {
    //   await sleep(100)
    // }

    let next = randomRecepient;

    // if (this.index == 0) {
    //   this.multicast(new MultiCastMessage(next.index))
    // }

    // TODO: Hvis mit index er i beskeden, så er det mig der multicaster næste gang.

    this.receive("a")
    this.receive("a")
    
  }

  async multicast(message) {

    for (let i = 0; i < nodeList.length; i++) {
      if (i != this.index) {
        this.medium.send(this, nodeList[i], message.message)
      }
    }
  } 

  async receive(message) {
    let recepient = randomRecepient(this.index);

    this.medium.send(this, recepient, Math.floor(random() * 100));

    // console.log(message.message)
  }

  display() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
  }
}




