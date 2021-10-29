async function setup() {
  createCanvas(windowWidth, windowHeight);

  // unmarked = color(255, 255, 255)
  // marked = color(255, 0, 0)

  bubble = false;
  values = [];
  size = 20;
  pause = 500
  p = floor(width / size);

  for (let i = 0; i < p; i++) {
    values.push(new Rectangle(map(i, 0, p - 1, p / 3, height)));
  }

  let algorithms = [
    async () => {
      console.log("Merge");
      await MergeSort(values, 0, values.length - 1);
    },
    async () => {
      console.log("Quick");
      await QuickSort(values, 0, values.length - 1);
    },
    async () => {
      console.log("Bubble");
      bubble = true;
      await BubbleSort(values, values.length);
      bubble = false;
    },
    async () => {
      console.log("Heap");
      await HeapSort(values, values.length)
    }
  ];

  while (true) {
    await shuffleArray(algorithms)

    for (let i = 0; i < algorithms.length; i++) {
      await shuffleArray(values);
      await algorithms[i]();
      await sleep(pause);
    }

    console.log("##################")
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
