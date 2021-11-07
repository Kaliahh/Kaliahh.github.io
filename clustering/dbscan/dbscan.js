async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  numberOfPoints = Math.floor(width / 3);

  epsilon = 60;
  MinPts = 7;

  


  while (true) {

    unvisited = [];
    visited = [];
    clusters = [];
    colors = [];

    unvisited = createPoints(numberOfPoints);
    
    await dbscan();
    await sleep(500);
  }
}

function draw() {
  background(51);

  for (let i = 0; i < unvisited.length; i++) {
    unvisited[i].color = color(255, 0, 0)
    unvisited[i].display()
  }
  
  for (let i = 0; i < visited.length; i++) {
    if (visited[i].noise) {
      visited[i].color = color(255, 255, 255)
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
      
      clusters[i][j].displayNeighborhood(epsilon);
      clusters[i][j].display();
    }
  }
}

async function dbscan() {
  while (unvisited.length > 0) {
    await sleep(20)
    let p = unvisited.pop();

    p.visited = true;
    visited.push(p);

    let neighborhood = getNeighborhood(p);

    if (neighborhood.length >= MinPts) {
      let cluster = [];

      clusters.push(cluster);
      cluster.push(p);

      for (let j = 0; j < neighborhood.length; j++) {
        let neighbor = neighborhood[j];
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

    console.log(unvisited.length);
  }
}



/*

mark all objects as unvisited
do
  randomly select an unvisited object p
  mark p as visited

  if the epsilon-neighborhood of p has at least MinPts object
    create a new cluster C, and add p to C
    let N be the set of objects in the epsilon-neighborhood of p
    for each point p' in N
      if p' is unvisited
        mark p' as visited
        if the epsilon neighborhood of p' has at least MinPts points
        add those points to N
      if p' is not yet a member of any cluster, add p' to C
    end for
    output C
  else mark p as noise
until no object is unvisited

*/

function isNotInCluster(point) {
  for (let i = 0; i < clusters.length; i++) {
    if (clusters[i].indexOf(point) != -1) {
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




