class Grid {
  constructor(n, m) {
    this.n = n;
    this.m = m;

    this.grid = new Array(n);

    for (let i = 0; i < n; i++) {
      this.grid[i] = new Array(m);
    }

    this.gridList = []
    this.index = 0

    this.preferredCount = nodeCount
    this.count = 0;

    this.boundary = 2;
    this.maxNeighborDistance = 4;
  }

  setGridNeighborhood() {
    for (let i = 0; i < this.gridList.length; i++) {
      this.findNeighborhood(this.gridList[i]);
      // this.gridList[i].setNeighborhood(this.gridList)
    }
  }

  drawNodes() {
    for (let i = 0; i < this.gridList.length; i++) {
      this.gridList[i].display()
      // this.drawBoundary(this.gridList[i].x, this.gridList[i].y)
      this.drawNeighborhood(this.gridList[i])
    }
  }

  

  drawGrid() {
    stroke(255, 50)
    strokeWeight(1)

    for (let i = 1; i < this.n; i++) {
      let k = map(i, 0, this.n, 0, width);
      line(k, 0, k, height);
    }

    for (let i = 1; i < this.m; i++) {
      let k = map(i, 0, this.m, 0, height);
      line(0, k, width, k)
    }
  }

  fillRow(row) {
    for (let i = 0; i < this.n; i++) {
      let node = this.grid[i][row]
      
      if (nullOrUndefined(node)) {
        this.grid[i][row] = new Node(medium, this.index, this.getX(i), this.getY(row))
        this.gridList[this.index] = this.grid[i][row];
        this.index += 1
      }
    }
  }

  fillColumn(col) {
    for (let i = 0; i < this.m; i++) {
      let node = this.grid[col][i]
      
      if (nullOrUndefined(node)) {
        this.grid[col][i] = new Node(medium, this.index, this.getX(col), this.getY(i))
        this.gridList[this.index] = this.grid[col][i];
        this.index += 1
      }
    }
  }

  fillAll() {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let node = this.grid[i][j]
      
        if (nullOrUndefined(node)) {
          this.grid[i][j] = new Node(medium, this.index, this.getX(i), this.getY(j))
          this.gridList[this.index] = this.grid[i][j];
          this.index += 1
        }
      }
    }
  }

  runAll() {
    for (let i = 0; i < this.gridList.length; i++) {
      this.gridList[i].run()
    }
  }

  getX(x) {
    return map(x, 0, this.n, 0, width) + (cellSize / 2)
  }

  getY(y) {
    return map(y, 0, this.m, 0, height) + (cellSize / 2)
  }

  randomFill() {
    while (this.index < this.preferredCount) {
      let x = getRandomInt(0, this.n);
      let y = getRandomInt(0, this.m);

      let node = this.grid[x][y]

      if (nullOrUndefined(node) && this.checkBoundary(x, y)) {
        this.grid[x][y] = new GridNode(medium, this.index, this.getX(x), this.getY(y), x, y)
        this.gridList[this.index] = this.grid[x][y];
        this.index += 1
      }
    }
  }

  drawSquare(x, y) {
    fill(255, 50);
    rectMode(CENTER)
    rect(x, y, cellSize, cellSize);
  }

  checkBoundary(x, y) {
    for (let i = x - this.boundary + 1; i < x + this.boundary; i++) {
      if (i < 0 || i >= this.n) {
        continue;
      }

      for (let j = y - this.boundary + 1; j < y + this.boundary; j++) {
        if (j < 0 || j >= this.m) {
          continue;
        }

        if (!nullOrUndefined(this.grid[i][j])) {
          return false;
        }
      }
    }

    return true;
  }

  drawBoundary(x, y) {
    for (let i = x - this.boundary + 1; i < x + this.boundary; i++) {
      if (i < 0 || i >= this.n) {
        continue;
      }

      for (let j = y - this.boundary + 1; j < y + this.boundary; j++) {
        if (j < 0 || j >= this.m) {
          continue;
        }

        this.drawSquare(this.getX(i), this.getY(j));
      }
    }
  }

  findNeighborhood(node) {
    let sentinel = true;
    let tempNeighborDistance = this.maxNeighborDistance;

    let x = node.x
    let y = node.y

    while (sentinel) {
      for (let i = x - tempNeighborDistance + 1; i < x + tempNeighborDistance; i++) {
        if (i < 0 || i >= this.n) {
          continue;
        }
  
        for (let j = y - tempNeighborDistance + 1; j < y + tempNeighborDistance; j++) {
          if (j < 0 || j >= this.m) {
            continue;
          }
  
          if (!nullOrUndefined(this.grid[i][j]) && this.grid[i][j].index != node.index) {
            node.addToNeighborhood(this.grid[i][j])
            this.grid[i][j].addToNeighborhood(node)
          }
        }
      }

      if (node.neighborhood.length < 2) {
        tempNeighborDistance += 1
      }
      else {
        sentinel = false;
      }
    }
  }

  drawNeighborhood(node) {
    for (let i = 0; i < node.neighborhood.length; i++) {
      stroke(255, 20)
      strokeWeight(1)
      drawLine(node.position, node.neighborhood[i].position)
    }
  }

  getCount() {
    if (this.count != 0) {
      return this.count;
    }

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        let node = this.grid[i][j]

        if (!nullOrUndefined(node)) {
          this.count += 1
        }
      }
    }

    return this.count
  }
}
