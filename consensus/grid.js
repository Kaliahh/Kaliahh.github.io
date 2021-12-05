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
  }

  setGridNeighborhood() {
    for (let i = 0; i < this.gridList.length; i++) {
      this.gridList[i].setNeighborhood(this.gridList);
    }
  }

  drawNodes() {
    for (let i = 0; i < this.gridList.length; i++) {
      this.gridList[i].display()
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

      if (nullOrUndefined(node) && this.checkNeighbors(x, y)) {
        this.grid[x][y] = new Node(medium, this.index, this.getX(x), this.getY(y))
        this.gridList[this.index] = this.grid[x][y];
        this.index += 1
      }
    }
  }

  tryInsert(node, x, y) {
    let temp = this.grid[x][y];

    if (nullOrUndefined(temp) && this.checkNeighbors(x, y)) {
      this.grid[x][y] = node
      return true
    }
    
    return false;
  }

  // TODO: Implement this
  checkNeighbors(x, y) {
    return true;
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
