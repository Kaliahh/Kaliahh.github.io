async function swap(arr, a, b) {
  // arr[a].color = marked
  if (bubble) {
    await sleep(10);
  }
  else {
    await sleep(20);
  }

  // arr[a].color = unmarked
  
  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}

async function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandomInt(0, array.length);
    await swap(array, i, j);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
