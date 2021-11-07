function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return Math.floor(random(min, max))
}

function distanceBetweenTwoPoints(a, b) {
  return dist(a.position.x, a.position.y, b.position.x, b.position.y)
}

function createPoints(n) {
  list = []
  
  for (i = 0; i < n; i++) {
    list.push(new Point())
  }
  
  return list
}


function randomColor() {
  return color(random(100,255), random(100,255), random(100,255));
}