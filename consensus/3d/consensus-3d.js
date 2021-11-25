async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(51);
  nodeList = []
  medium = new Medium();


  numberOfPoints = Math.floor(height / 10);

  axisLength = Math.floor(height / 2.3);

  nodeList = createNodes(numberOfPoints, medium)

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

  drawAxis()


  for (let i = 0; i < nodeList.length; i++) {
    // nodeList[i].move();
    nodeList[i].display();
  }

  for (let i = 0; i < medium.messageList.length; i++) {
    medium.messageList[i].displayPath();
    medium.messageList[i].display(); 
  }
}


function drawAxis() {

  rotateX(radians(-15))
  rotateY(millis() / 4000);

  strokeWeight(2)
  stroke(100)
  line(0, 0, axisLength, 0)

  // stroke(color(230, 25, 75))
  line(0, 0, -axisLength, 0)

  // stroke(color(60, 180, 75))
  line(0,0,0,axisLength)

  // stroke(color(0, 130, 200))
  line(0,0,0,-axisLength)

  // stroke(color(255, 255, 25))
  line(0,0,0, 0,0,axisLength)
  
  // stroke(color(240, 50, 230))
  line(0,0,0, 0,0,-axisLength)
}
