function setup() {
  createCanvas(500, 500);
  background(51);
  frameRate(10)
  
  numberOfPoints = 1000;
  
  k = 5;
  
  listOfPoints = createPoints(numberOfPoints);
  
  listOfCentroidColors = getCentroidColors();
  
  listOfCentroids = pickInitialCentroids(listOfPoints, listOfCentroidColors);
  // listOfCentroids = placeCentroidsInCentre(listOfCentroidColors)
  
  lastCentroids = null;
}

function draw() {
  background(51);
  
  for (i = 0; i < numberOfPoints; i++) {
    listOfPoints[i].display()
  }
  
  for (i = 0; i < k; i++) {
    listOfCentroids[i].display()
  }
  
  KMeans(listOfPoints, listOfCentroids)
  // drawBoundaries(listOfCentroids)
}

function drawBoundaries(centroids) {
  for (i = 0; i < centroids.length; i++) {
    for (j = 0; j < centroids.length; j++) {
      if (centroids[i] != centroids[j]) {
        middlePoint = createVector((centroids[i].position.x + centroids[j].position.x) / 2, 
                                   (centroids[i].position.y + centroids[j].position.y) / 2)
      
        pony = new Point(middlePoint.x, middlePoint.y, 30)
        pony.display()
      }
    }
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
  
  for (j = 0; j < centroids.length; j++) {
    let x = positionList[j].x / pointsPerCentroid[j]
    let y = positionList[j].y / pointsPerCentroid[j]
    
    
    
    centroids[j].position = createVector(x, y)
  }
}



function distanceBetweenTwoPoints(a, b) {
  return dist(a.position.x, a.position.y, b.position.x, b.position.y)
}

function getCentroidColors() {
  list = []
  
  list.push(color(230, 25, 75))
  list.push(color(60, 180, 75))
  list.push(color(0, 130, 200))
  list.push(color(255, 255, 25))
  list.push(color(240, 50, 230))
  list.push(color(0, 0, 128))
  
  return list
}

function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;

  return Math.floor(random(min, max))
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

function createPoints(n) {
  list = []
  
  for (i = 0; i < n; i++) {
    list.push(new Point())
  }
  
  return list
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class Point {
  constructor(x, y, diameter) {
    
    if (x == null && y == null && diameter == null) {
      x = random(20, width - 20)
      y = random(20, height - 20)
      diameter = 10
    }
    
    this.position = createVector(x, y)
    this.diameter = diameter
    this.color = color(255, 255, 255)
    this.centroid = null
    this.distanceToCentroid = 0;
  }
  
  display() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
  }
}

