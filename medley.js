async function setup() {
  createCanvas(windowWidth, windowHeight);
  start = millis();
  isShuffling = false;

  textSize(width / 30)

  bubble = false;
  quick = false;
  values = [];
  size = 20;
  pause = 500
  p = floor(width / size);

  osc1 = new p5.Oscillator('sine');
  osc1.start()
  osc1.amp(0.1)

  osc2 = new p5.Oscillator('triangle');
  osc2.start()
  osc2.amp(0.1)

  for (let i = 0; i < p; i++) {
    values.push(new Rectangle(map(i, 0, p - 1, p / 3, height)));
  }

  let algorithms = [
    // async () => {
    //   console.log("Merge");
    //   await MergeSort(values, 0, values.length - 1);
    // },
    // async () => {
    //   console.log("Quick");
    //   quick = true;
    //   await QuickSort(values, 0, values.length - 1);
    //   quick = false;
    // },
    // async () => {
    //   console.log("Bubble");
    //   bubble = true;
    //   await BubbleSort(values, values.length);
    //   bubble = false;
    // },
    // async () => {
    //   console.log("Heap");
    //   await HeapSort(values, values.length)
    // },
    async () => {
      console.log("Insertion");
      await InsertionSort(values);
    }
  ];

  while (true) {
    await shuffleArray(algorithms)

    for (let i = 0; i < algorithms.length; i++) {
      isShuffling = true
      await shuffleArray(values);
      isShuffling = false;

      start = millis();
      await algorithms[i]();
      end = millis();

      console.log(Math.floor(end - start))

      await sleep(pause);
    }

    console.log("##################")
  }
}

function draw() {
  background(51);

  if (!isShuffling) {
    text(Math.floor((millis() - start) / 1000), 20, width / 30)
  }

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(values[i].color);
    rect(i * size, height - values[i].value, size - 1, values[i].value);
  }
}
