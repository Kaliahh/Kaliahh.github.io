// TODO: Include randomly choosing between Root, 1st, and 2nd inversions

let minorChords = ["Am", "Bbm", "Bm", "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m"];
let majorChords = ["A", "Bb", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let inversions = ["Root", "1st", "2nd"];
let chords = [];
let outInversions = [""];

let chosenChords = -1;
let shuffle = true;
let index = 0;
let begin = true;

let previous = "";

let nextBtn = document.getElementById("nextBtn");
let minorBtn = document.getElementById("minorBtn");
let majorBtn = document.getElementById("majorBtn");
let resetBtn = document.getElementById("resetBtn");
let backBtn = document.getElementById("backBtn");

let output = document.getElementById("output");
let inversion = document.getElementById("inversion");

let progressBar = document.getElementById("progress");
let progressBorder = document.getElementById("progress-border");

let finishedChords = document.getElementById("finished-chords");

let inversionsCheckbox = document.getElementById("includeInversions");

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

hideElement(backBtn);
hideElement(nextBtn);
hideElement(inversion);
hideElement(output);
hideElement(resetBtn);
hideElement(progressBorder);

nextBtn.addEventListener('click', event => {
  getChord();
})

minorBtn.addEventListener('click', event => {
  makeChoice(0);
})

majorBtn.addEventListener('click', event => {
  makeChoice(1);
})

resetBtn.addEventListener('click', event => {
  reset();
})

backBtn.addEventListener('click', event => {
  reset();
})

function makeChoice(choice) {
  chosenChords = choice;
  showElement(backBtn);
  showElement(nextBtn);
  showElement(output);
  if (inversionsCheckbox.checked) {
    showElement(inversion);
  }
  // showElement(progressBorder);
  hideElement(inversionsCheckbox);
  hideElement(minorBtn);
  hideElement(majorBtn);
  showFlexElement(finishedChords);
  finishedChords.innerHTML = generateFinishedChordsHTML();
  getChord();
}

function hideElement(elem) {
  elem.style.display = "none";
}

function showElement(elem) {
  elem.style.display = "initial";
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

  if (index % outInversions.length == 0) {
    outInversions = [...inversions]
    shuffleArray(outInversions);
  }

  index++;

  if (index == chords.length) {
    nextBtn.innerHTML = "Finish"
  }
  else if (index > chords.length) {
    output.innerHTML = ".";
    inversion.innerHTML = ".";
    progressBar.style.backgroundColor = getGreen();
    setPrevious()
    hideElement(nextBtn);
    showElement(resetBtn);
    return;
  }

  output.innerHTML = chords[index % chords.length];
  inversion.innerHTML = outInversions[index % outInversions.length];
  progressBar.style.width = p5.prototype.map(index, 0, chords.length, 0, 100) + "%";

  setPrevious()
}

function setPrevious() {
  if (previous != "") {
    let prev = document.getElementById(previous);
    prev.style.color = getGreen();
    prev.style.textDecoration = "underline";
  }

  previous = chords[index % chords.length];
}

function reset() {
  nextBtn.innerHTML = "Next";
  previous = "";
  begin = true;
  index = 0;
  chosenChords = -1;
  hideElement(nextBtn);
  hideElement(output);
  hideElement(inversion);
  showElement(minorBtn);
  showElement(majorBtn);
  showElement(inversionsCheckbox);
  hideElement(progressBorder);
  progressBar.style.backgroundColor = "white";
  hideElement(finishedChords)
  hideElement(resetBtn)
  hideElement(backBtn)
}

function getGreen() {
  return "rgba(60, 180, 75, 1)"
}