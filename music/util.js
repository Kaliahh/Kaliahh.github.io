function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = getRandomInt(0, array.length);
      swap(array, i, j);
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}