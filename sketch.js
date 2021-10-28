function setup() {
  createCanvas(windowWidth, windowHeight);
  

  values = [];
  
  size = 20;
  
  p = 0;

  for (let i = 0; i < floor(width / size); i++) {
    values[i] = random(height);
  }
  
  BubbleSort(values, values.length);
  
}




function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    rect(i * size, height - values[i], size - 1, values[i]);
  }

}


async function swap(arr, a, b) {
  await sleep(20);
  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}


async function BubbleSort(A, n) {
  for (let i = 0; i < n - 1; i++) {
    
    for (let j = 0; j < n - i - 1; j++) {
      
      if (A[j] > A[j + 1]) {
        await swap(A, j, j + 1);
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
