async function setup() {
  createCanvas(windowWidth, windowHeight);
  start = millis();
  isShuffling = false;

  textSize(width / 40)

  runningAlgortihm = "";

  bubble = false;
  quick = false;
  insertion = false;
  selection = false;
  values = [];
  size = 20;
  pause = 500;
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

  modifiers = {
    "Fast Bubble": 0.5,
    "Gnome": 0.25,
    "Heap": 1,
    "Insertion": 0.25,
    "Merge": 15,
    "OddEven": 0.5,
    "Quick": 3,
    "Selection": 3,
    "Shell": 1
  };

  let algorithms = [
    async () => {
      runningAlgortihm = "Merge";
      await MergeSort(values, 0, values.length - 1);
    },
    async () => {
      runningAlgortihm = "Quick";
      quick = true;
      await QuickSort(values, 0, values.length - 1);
      quick = false;
    },
    async () => {
      runningAlgortihm = "Fast Bubble";
      bubble = true;
      await BubbleSort(values, values.length);
      bubble = false;
    },
    async () => {
      runningAlgortihm = "Heap";
      await HeapSort(values, values.length)
    },
    async () => {
      runningAlgortihm = "Insertion";
      insertion = true;
      await InsertionSort(values);
      insertion = false;
    },
    async () => {
      runningAlgortihm = "Selection";
      selection = true;
      await SelectionSort(values);
      selection = false;
    },
    async () => {
      runningAlgortihm = "Shell";
      await ShellSort(values);
    },
    async () => {
      runningAlgortihm = "OddEven";
      await OddEvenSort(values);
    },
    async () => {
      runningAlgortihm = "Gnome";
      await GnomeSort(values);
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

      console.log(runningAlgortihm + ": " + Math.floor(end - start))

      await sleep(pause);
    }

    console.log("##################")
  }
}

function draw() {
  background(51);

  if (!isShuffling) {
    text(runningAlgortihm + " (x" + modifiers[runningAlgortihm] + "): " + Math.floor((millis() - start) / 1000), 20, width / 40)
  }

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(values[i].color);
    rect(i * size, height - values[i].value, size - 1, values[i].value);
  }
}
