async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  medium = new Medium();

  nodeList = createNodes(width / 20, medium)

  // arrangeInCircle(nodeList);
  // arrangeInSquare(nodeList);

  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].run();
  }

  while (true) {
    await medium.update();

    await sleep(10);
  }
}



function draw() {
  background(51) 


  for (let i = 0; i < nodeList.length; i++) {
    // nodeList[i].move();
    nodeList[i].display();
  }

  for (let i = 0; i < medium.messageList.length; i++) {
    medium.messageList[i].displayPath();
    medium.messageList[i].display(); 
  }
}

