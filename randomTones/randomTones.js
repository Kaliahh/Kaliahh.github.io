function setup() {
  createCanvas(windowWidth, windowHeight)

  tones = ["A", "Bb", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

  index = 0;

  selectedTone = "Click mouse";
  roundStatus = "";
}

function draw() {
  background(51)
  let size = width / 7;
  textSize(size)
  fill(255)
  textAlign(CENTER, CENTER)
  if (roundStatus == "") {
    text(selectedTone, width / 2, height / 2)
  }
  else {
    text(selectedTone, width / 2, height / 2)
    size = width / 10
    textSize(size)
    text(roundStatus, width / 2, height - size)
  }
}

function touchStarted() {
  if (index == 0) {
    shuffleArray(tones);
    roundStatus = ""
  }

  selectedTone = tones[index]

  index++;

  if (index == tones.length) {
    index = 0;
    roundStatus = "Last in this round"
  }
}

function touchEnded() {

}

function mouseClicked() {
  // if (index == 0) {
  //   shuffleArray(tones);
  //   roundStatus = ""
  // }

  // selectedTone = tones[index]

  // index++;

  // if (index == tones.length) {
  //   index = 0;
  //   roundStatus = "Last in this round"
  // }
}


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