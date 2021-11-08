class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// min inc, max exc
// function getRandomInt(min, max) {
//   return Math.floor(random(min, max))
// }
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
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
  let n = getRandomInt(0, 3)

  // return color(n, 100, 100);

  if (n == 0) {
    return color(0, random(100, 255), random(100, 255));
  }
  else if (n == 1) {
    return color(random(100, 255), 0, random(100, 255));
  }
  else {
    return color(random(100, 255), random(100, 255), 0);
  }

  // return color(random(100,255), random(100,255), random(100,255));
}

function getClusterColors() {
  list = []
  
  list.push(color(230, 25, 75))   // Red
  list.push(color(60, 180, 75))   // Green
  list.push(color(0, 130, 200))   // Blue
  list.push(color(255, 255, 25))  // Yellow
  list.push(color(240, 50, 230))  // Magenta
  list.push(color(245, 130, 48))  // Orange
  list.push(color(70, 240, 240))  // Cyan
  list.push(color(145, 30, 180))  // Purple
  list.push(color(220, 190, 255)) // Lavender
  list.push(color(170, 255, 195)) // Mint
  list.push(color(255, 190, 212)) // Pink
  
  return list;
}


// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = getRandomInt(0, array.length);
//         swap(array, i, j);
//     }
// }

// function swap(arr, a, b) {
//   let temp = arr[a];
//   arr[a] = arr[b]
//   arr[b] = temp;
// }