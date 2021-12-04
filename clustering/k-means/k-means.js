async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  
  numberOfPoints = Math.floor(width / 3);

  while (true) {
    distanceMoved = 0;
    k = getRandomInt(3, 6)

    listOfPoints = createPoints(numberOfPoints);

    let listOfCentroidColors = getClusterColors();
    
    listOfCentroids = pickInitialCentroids(listOfPoints, listOfCentroidColors);

    while (true) {
      KMeans(listOfPoints, listOfCentroids);
      if (distanceMoved < 0.1) {
        await sleep(500);
        break;
      }
      else {
        await sleep(300);
      }
      distanceMoved = 0;
    }
  }
}

function draw() {
  background(51);
  
  for (i = 0; i < numberOfPoints; i++) {
    listOfPoints[i].display()
  }
  
  for (i = 0; i < k; i++) {
    listOfCentroids[i].display()
  }
}

function KMeans(points, centroids) {
  assignPointsToCentroids(points, centroids)
  updateCentroids(points, centroids)
}

function assignPointsToCentroids(points, centroids) {
  for (i = 0; i< points.length; i++) {
    for (j = 0; j < centroids.length; j++) {
      if (points[i].centroid == null) {
        points[i].centroid = centroids[j];
        points[i].distanceToCentroid = distanceBetweenTwoPoints(points[i], points[i].centroid)
        points[i].color = points[i].centroid.color
      }
      else if (points[i].centroid != centroids[j]) {
        points[i].distanceToCentroid = distanceBetweenTwoPoints(points[i], points[i].centroid)
        distanceToNewCentroid = distanceBetweenTwoPoints(points[i], centroids[j])
        
        if (distanceToNewCentroid <= points[i].distanceToCentroid) {
          points[i].centroid = centroids[j]
          points[i].distanceToCentroid = distanceToNewCentroid
          points[i].color = points[i].centroid.color
        }
      }
    }
  }
}

function updateCentroids(points, centroids) {
  positionList = []
  pointsPerCentroid = []
  
  for (i = 0; i < points.length; i++) {
    for (j = 0; j < centroids.length; j++) {
      if (points[i].centroid == centroids[j]) {
        if (positionList[j] == null) {
          positionList[j] = createVector(points[i].position.x, points[i].position.y)
          pointsPerCentroid[j] = 1
        }
        else {
          positionList[j].add(createVector(points[i].position.x, points[i].position.y))
          pointsPerCentroid[j] += 1
        }
      }
    }
  }
  
  // TODO: Use lerping for something here, to make the movement less janky
  for (j = 0; j < centroids.length; j++) {
    if (positionList[j] != undefined) {
      let x = positionList[j].x / pointsPerCentroid[j];
      let y = positionList[j].y / pointsPerCentroid[j];    
  
      let v = createVector(x, y);
      
      distanceMoved += v.dist(centroids[j].position);
  
      centroids[j].position = v
    }
  }
}

function pickInitialCentroids(list, colors) {
  centroidList = []
  
  for (i = 0; i < k; i++) {
    randomIndex = getRandomInt(0, numberOfPoints)
    
    newCentroid = new Point(list[randomIndex].position.x, list[randomIndex].position.y, 20)
    newCentroid.color = colors[i]
    
    centroidList.push(newCentroid)
  }
  
  return centroidList
}

function placeCentroidsInCentre(colors) {
  centroidList = []
  
  for (j = 0; j < k; j++) {
    newCentroid = new Point(width / 2 + j, height / 2 + j, 20)
    newCentroid.color = colors[j]
    
    centroidList.push(newCentroid)
  }
  
  return centroidList
}