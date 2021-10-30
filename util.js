async function swap(arr, a, b) {

  setFreq(osc1, b);
  setFreq(osc2, a);

  // if (bubble) {
  //   await sleep(10);
  // }
  // else if (quick) {
  //   await sleep(60);
  // }
  // else if (insertion) {
  //   await sleep(5);
  // }
  // else if (selection) {
  //   await sleep(60);
  // }
  // else {
  //   await sleep(20);
  // }

  await sleep20()

  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}

async function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        let j = getRandomInt(0, array.length);
        await swap(array, i, j);
    }
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function sleep20() {
  return new Promise(resolve => setTimeout(resolve, 20 * modifiers[runningAlgortihm]));
}

function sleep2() {
  return new Promise(resolve => setTimeout(resolve, 2 * modifiers[runningAlgortihm]));
}

function setFreq(osc, n) {
  let freq = map(values[n].value, p / 3, height, 100, 500);
  osc.freq(freq, 0.05)
}
