function setup() {
  createCanvas(windowWidth, windowHeight);
  
  values = [];
  
  size = 20;
  
  p = floor(width / size);

  for (let i = 0; i < p; i++) {
    // values[i] = map(i, 0, p - 1, p / 3, height);
    values.push(new Noget(map(i, 0, p - 1, p / 3, height)));
    
    // values[i] = random(height);
  }
  
  BubbleSort(values, values.length);
}

class Noget {
  constructor(value) {
    this.value = value;
    this.color = color(255, 255, 255);
  }
}




function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(values[i].color);
    rect(i * size, height - values[i].value, size - 1, values[i].value);
  }

}


async function swap(arr, a, b) {
  await sleep(20);
  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}


async function BubbleSort(A, n) {
  
  for (let i = 0; i < n ; i += 2) {
    
    for (let j = 0; j < n - 1; j++) {
      
      if (A[j].value > A[j + 1].value) {
        A[j].color = color(255, 0, 0)
        await swap(A, j, j + 1);
        A[j + 1].color = color(255, 255, 255)
      }
    }
    
    for (let j = n - 1; j > 0; j--) {
      if (A[j].value < A[j - 1].value) {
        A[j].color = color(255, 0, 0)
        await swap(A, j, j - 1);
        A[j - 1].color = color(255, 255, 255)
      }
    }
  }
  
  await shuffleArray(A);
  await BubbleSort(A,n);
}

async function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        await sleep(20);
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
