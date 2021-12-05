class Medium {
  constructor() {
    this.messageList = []
  }

  async send(source, target, message) {
    if (source == undefined) {
      console.log("Source undefined")
    }
    else if (source == null) {
      console.log("Source null")
    }
    if (target == undefined) {
      console.log("Target undefined")
    }
    else if (target == null) {
      console.log("Target null")
    }

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