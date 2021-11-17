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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function distanceBetweenTwoPoints(a, b) {
  return dist(a.x, a.y, b.x, b.y)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


function createNodes(n, medium) {
  list = []
  
  for (i = 0; i < n; i++) {
    list.push(new Node(medium, i))
  }
  
  return list
}

function randomRecepient(myIndex) {
  let index;
  let recepient;

  do {
    index = getRandomInt(0, nodeList.length);
    if (index != myIndex) {
      recepient = nodeList[index];
    }
  } while (index == myIndex)

  return recepient;
}

function arrangeInCircle(list) {
  let radius = height / 2.3;

  for (let i = 0; i < list.length; i++) {
    let n = map(i, 0, list.length, 0, TWO_PI)

    let vec = createVector(radius, 0)
      .rotate(n)
      .add(createVector(width / 2, height / 2))

    list[i].position = vec
  }
}