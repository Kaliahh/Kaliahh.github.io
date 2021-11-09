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


const isTouchDevice =  function() {
  const is_or_not =  'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface

  return is_or_not ? true : false; // Fix to always return true or false
};


function mousePressed() {
  if( isTouchDevice() )
   return;

  mousePressX = mouseX;
  mousePressY = mouseY;

  console.log('mousePressed', mousePressX, mousePressY)
}

function mouseReleased(e) {
  if( isTouchDevice() )
    return;

  if(mousePressX == mouseX && mousePressY == mouseY)
    singleTap();

}

function mouseClicked() {
  if( !isTouchDevice() )
    return;

  singleTap();
}

function singleTap() {
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