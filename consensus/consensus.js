async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  medium = new Medium();

  nodeList = createNodes(width / 20, medium)

  // node1 = new Node(medium, 0, width / 2 - 100, height / 2);
  // node2 = new Node(medium, 1, width / 2 + 100, height / 2);

  // nodeList = []

  // nodeList.push(node1);
  // nodeList.push(node2)

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

