async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  numberOfPoints = Math.floor(width / 3);

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
  return Math.floor(0.0000205299 * Math.pow(width, 2) + 0.0012174476 * width + 27.8965922976)
}

function draw() {
  background(51);

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

async function dbscan() {
  while (unvisited.length > 0) {
    // await sleep(20)
    let p = unvisited.pop();

    p.visited = true;
    visited.push(p);

    let neighborhood = getNeighborhood(p);

    if (neighborhood.length >= MinPts) {
      p.corePoint = true;
      let cluster = [];

      clusters.push(cluster);
      cluster.push(p);

      while (neighborhood.length > 0) {
        await sleep(20)
        let neighbor = neighborhood.pop();
        let b;
        let index;

        if (unvisited.includes(neighbor)) {
          index = unvisited.indexOf(neighbor);
          b = unvisited.splice(index, 1)[0];
        }
        else if (visited.includes(neighbor)) {
          index = visited.indexOf(neighbor);
          b = visited[index];
        }
        else {
          console.log("This should not happen")
        }

        if (b.visited == false) {
          b.visited = true;
          visited.push(b);

          let otherNeighborhood = getNeighborhood(b);

          if (otherNeighborhood.length >= MinPts) {
            b.corePoint = true;
            for (let o = 0; o < otherNeighborhood.length; o++) {
              neighborhood.push(otherNeighborhood[o])
            }
          }
        }

        if (isNotInCluster(b)) {
          cluster.push(b);
        }
      }
    }
    else {
      p.noise = true;
    }
  }
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




