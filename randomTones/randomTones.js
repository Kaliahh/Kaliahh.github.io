function setup() {
  createCanvas(windowWidth, windowHeight)
  
  tones = []

  index = 0;

  selectedTone = "Click anywhere";
  rectSize = width / 12;
  rectCounter = 0;
}

function draw() {
  background(51)
  let size = width / 7;
  textSize(size)
  fill(255)
  textAlign(CENTER, CENTER)
  text(selectedTone, width / 2, height / 2)

  if (rectCounter == 12) {
    fill(color(60, 180, 75))
  }
  else {
    fill(255)
  }

  rect(0,0, rectSize * rectCounter, height / 20)
  // rect(0, height - height / 20, rectSize * rectCounter, height / 20)
  rect(width - rectSize * rectCounter, height - height / 20, width, height)
}

function singleTap() {
  rectCounter++;
  if (index == 0) {
    tones = createArrayOfTones();
    shuffleArray(tones);
    rectCounter = 1
  }

  selectedTone = tones[index]

  index++;

  if (index == tones.length) {
    index = 0;
  }
}

function resetArray(tones) {
  tones = [...tonesTemplate]


}

function createArrayOfTones() {
  list = []

  list = ["A", "B", "C", "D", "E", "F", "G"]

  if (random() < 0.5) {
    list.push("Bb")
  }
  else {
    list.push("A#")
  }

  if (random() < 0.5) {
    list.push("Db")
  }
  else {
    list.push("C#")
  }

  if (random() < 0.5) {
    list.push("Eb")
  }
  else {
    list.push("D#")
  }

  if (random() < 0.5) {
    list.push("Gb")
  }
  else {
    list.push("F#")
  }

  if (random() < 0.5) {
    list.push("Ab")
  }
  else {
    list.push("G#")
  }

  return list;
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
}

function mouseReleased(e) {
  if( isTouchDevice() )
    return;

  // if(mousePressX == mouseX && mousePressY == mouseY)
    singleTap();

}

function mouseClicked() {
  if( !isTouchDevice() )
    return;

  singleTap();
}

