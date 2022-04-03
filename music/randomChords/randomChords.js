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

let progressBar = document.getElementById("progress");
let progressBorder = document.getElementById("progress-border");

// let grid = document.getElementById("buttonsContainer");

let finishedChords = document.getElementById("finished-chords");

function generateFinishedChordsHTML() {
  let chordsList = [];

  if (chosenChords == 0) {
    chordsList = minorChords;
  }
  else if (chosenChords == 1) {
    chordsList = majorChords;
  }

  result = "";

  for (let i = 0; i < chordsList.length; i++) {
    result += '<p id="' + chordsList[i] + '">' + chordsList[i] + "</p>";
  }

  return result;
}

hideElement(nextBtn);
hideElement(output);
hideElement(progressBorder)

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
  showElement(progressBorder);
  hideElement(minorBtn);
  hideElement(majorBtn);
  showFlexElement(finishedChords);
  finishedChords.innerHTML = generateFinishedChordsHTML();
  getChord();
  // grid.style.gridTemplateColumns = "auto";
}

function hideElement(elem) {
  elem.style.display = "none";
}

function showElement(elem) {
  elem.style.display = "block";
}

function showFlexElement(elem) {
  elem.style.display = "flex";
}

function getChord() {
  if (begin) {
    if (chosenChords == 0) {
      chords = [...minorChords];
    }
    else {
      chords = [...majorChords];
    }
    shuffleArray(chords);
    begin = false;
  }

  index++;

  if (index == chords.length) {
    nextBtn.innerHTML = "Finish"
    progressBar.style.backgroundColor = getGreen();
  }
  else if (index > chords.length) {
    reset();
    return;
  }

  output.innerHTML = chords[index - 1];
  progressBar.style.width = p5.prototype.map(index, 0, chords.length, 0, 100) + "%";
  document.getElementById(chords[index - 1]).style.color = getGreen();
}

function reset() {
  nextBtn.innerHTML = "Next";
  begin = true;
  index = 0;
  chosenChords = -1;
  hideElement(nextBtn);
  hideElement(output);
  showElement(minorBtn);
  showElement(majorBtn);
  hideElement(progressBorder);
  progressBar.style.backgroundColor = "white";
  hideElement(finishedChords)
  
  // grid.style.gridTemplateColumns = "auto auto";
}

function getGreen() {
  return "rgba(60, 180, 75, 1)"
}