async function swap(arr, a, b) {
  if (bubble) {
    await sleep(10);
  }
  else if (quick) {
    await sleep(60);
  }
  else {
    await sleep(20);
  }

  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}

async function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        await swap(array, i, j);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
