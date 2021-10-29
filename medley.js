async function setup() {
  createCanvas(windowWidth, windowHeight);

  bubble = false;
  quick = false;
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
      quick = true;
      await QuickSort(values, 0, values.length - 1);
      quick = false;
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

      let start = millis();
      await algorithms[i]();
      let end = millis();

      console.log(end - start)

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
