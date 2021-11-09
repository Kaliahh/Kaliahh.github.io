async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(51);

  numberOfPoints = Math.floor(height / 2.3);

  axisLength = Math.floor(height / 2.3);


  epsilon = getEpsilon();
  MinPts = 4;

  while (true) {
    clusters = [];
    colors = getClusterColors();
    unvisited = createPoints(numberOfPoints);
    visited = [];
    
    await dbscan();
    await sleep(1000);
  }
}

function getEpsilon() {
  // 300 -> 30
  // 544 -> 35
  // 750 (1080p) -> 40
  // 1006 (1440p) -> 50
  // return Math.floor(0.0000205299 * Math.pow(width, 2) + 0.0012174476 * width + 27.8965922976)
  return 75;
}

function draw() {
  background(51);
  
  drawAxis()

  for (let i = 0; i < unvisited.length; i++) {
    unvisited[i].color = color(255, 255, 255)
    unvisited[i].display()
  }
  
  for (let i = 0; i < visited.length; i++) {
    if (visited[i].noise) {
      visited[i].color = color(100) 
    }
    else {
      visited[i].color = color(0, 255, 0)
    }
    visited[i].display()
  }


  for (let i = 0; i < clusters.length; i++) {
    for (let j = 0; j < clusters[i].length; j++) {
      if (colors[i] == undefined) {
        colors[i] = randomColor();
      }

      clusters[i][j].color = colors[i];
      clusters[i][j].display();

      // if (!(clusters[i][j].corePoint)) {
      //   clusters[i][j].color = color(255, 255, 255)
      // }

      clusters[i][j].displayNeighborhood(epsilon);
    }
  }
}

function drawAxis() {

  rotateX(radians(-15))
  rotateY(millis() / 9000);

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

async function dbscan() {
  while (unvisited.length > 0) {
    let p = unvisited.pop();

    p.visited = true;
    visited.push(p);

    let neighborhood = getNeighborhood(p);

    if (neighborhood.length >= MinPts) {
      p.corePoint = true;
      let cluster = [];

      clusters.push(cluster);
      cluster.push(p);

      await scanNeighborhood(neighborhood, cluster);
    }
    else {
      p.noise = true;
    }
  }
}

async function scanNeighborhood(nbh, cluster) {
  while (nbh.length > 0) {
    await sleep(20)
    let neighbor = getNeighbor(nbh.pop())

    if (neighbor.visited == false) {
      neighbor.visited = true;
      visited.push(neighbor);

      let otherNeighborhood = getNeighborhood(neighbor);

      if (otherNeighborhood.length >= MinPts) {
        neighbor.corePoint = true;
        scanOtherNeighborhood(nbh, otherNeighborhood);
      }
    }

    if (isNotInCluster(neighbor)) {
      cluster.push(neighbor);
    }
  }
}

function scanOtherNeighborhood(originalNeighborhood, otherNeighborhood) {
  for (let i = 0; i < otherNeighborhood.length; i++) {
    originalNeighborhood.push(otherNeighborhood[i])
  }
}

function getNeighbor(temp) {
  let neighbor = null;

  if (unvisited.includes(temp)) {
    index = unvisited.indexOf(temp);
    neighbor = unvisited.splice(index, 1)[0];
  }
  else if (visited.includes(temp)) {
    index = visited.indexOf(temp);
    neighbor = visited[index];
  }
  else {
    console.log("This should not happen")
  }

  return neighbor;
}

function isNotInCluster(point) {
  for (let i = 0; i < clusters.length; i++) {
    if (clusters[i].includes(point)) {
      return false;
    }
  }

  return true;
}

function getNeighborhood(point) {
  let list = [];

  for (let i = 0; i < unvisited.length; i++) {
    if (distanceBetweenTwoPoints(point, unvisited[i]) <= epsilon) {
      list.push(unvisited[i]);
    }
  }

  for (let i = 0; i < visited.length; i++) {
    if (distanceBetweenTwoPoints(point, visited[i]) <= epsilon) {
      list.push(visited[i]);
    }
  }

  return list;
}