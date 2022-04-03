let minorChords = ["Am", "Bbm", "Bm", "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m"];
let majorChords = ["A", "Bb", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let chords = [];

let chosenChords = -1;
let shuffle = true;
let index = 0;
let begin = true;

let nextBtn = document.getElementById("nextBtn");
let minorBtn = document.getElementById("minorBtn");
let majorBtn = document.getElementById("majorBtn");

let output = document.getElementById("output");
let outIndex = document.getElementById("index");

let grid = document.getElementById("buttonsContainer");

hideElement(nextBtn);
hideElement(output);
hideElement(outIndex);

nextBtn.addEventListener('click', event => {
  getChord();
})

minorBtn.addEventListener('click', event => {
  makeChoice(0);
})

majorBtn.addEventListener('click', event => {
  makeChoice(1);
})

function makeChoice(choice) {
  chosenChords = choice;
  showElement(nextBtn);
  showElement(output);
  showElement(outIndex);
  hideElement(minorBtn);
  hideElement(majorBtn);
  getChord();
  grid.style.gridTemplateColumns = "auto";
}

function hideElement(elem) {
  elem.style.display = "none";
}

function showElement(elem) {
  elem.style.display = "block";
}

function getChord() {
  if (begin) {
    if (chosenChords == 0) {
      chords = minorChords;
    }
    else {
      chords = majorChords;
    }
    shuffleArray(chords);
    begin = false;
  }

  output.innerHTML = chords[index];
  outIndex.innerHTML = (index + 1) + "/" + chords.length;
  
  index++;
  if (index == chords.length) {
    nextBtn.innerHTML = "Finish"
  }
  else if (index >= chords.length) {
    reset()
  }
}

function reset() {
  nextBtn.innerHTML = "Next";
  begin = true;
  index = 0;
  chosenChords = -1;
  hideElement(nextBtn);
  hideElement(output);
  hideElement(outIndex);
  showElement(minorBtn);
  showElement(majorBtn);
  grid.style.gridTemplateColumns = "auto auto";
}

