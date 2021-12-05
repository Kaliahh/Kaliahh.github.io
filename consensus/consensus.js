async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  medium = new Medium();

  cellSize = 50; // Cells should be 50x50

  let n = floor(width / cellSize);
  let m = floor(height / cellSize);

  nodeCount = floor(width / 20)
  // nodeCount = floor((n * m) / 10)

  console.log(nodeCount)

  grid = new Grid(n, m)

  // grid.fillRow(0)
  // grid.fillRow(m - 1)

  // grid.fillColumn(0)
  // grid.fillColumn(n - 1)

  grid.randomFill()

  // arrangeInCircle(grid.gridList)

  grid.setGridNeighborhood()

  grid.runAll()

  while (true) {
    await medium.update();

    await sleep(10);
  }
}

function draw() {
  background(51) 

  grid.drawNodes()
  // grid.drawGrid()


  for (let i = 0; i < medium.messageList.length; i++) {
    medium.messageList[i].displayConnection();
    medium.messageList[i].display(); 
  }
}
