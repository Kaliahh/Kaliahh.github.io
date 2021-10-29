async function setup() {
  createCanvas(windowWidth, windowHeight);

  unmarked = color(255, 255, 255)
  marked = color(255, 0, 0)

  values = [];
  size = 20;
  pause = 500
  p = floor(width / size);

  for (let i = 0; i < p; i++) {
    values.push(new Rectangle(map(i, 0, p - 1, p / 3, height)));
  }

  let algorithms = [
    () => MergeSort(values, 0, values.length - 1),
    () => QuickSort(values, 0, values.length - 1),
    () => BubbleSort(values, values.length),
    () => HeapSort(values, values.length)
  ];

  while (true) {
    await shuffleArray(algorithms)

    for (let i = 0; i < algorithms.length; i++) {
      await shuffleArray(values);
      await algorithms[i]();
      await sleep(pause);
    }
  }
}

function executeFunctions(funcs) {
  for (var i = 0, len = funcs.length; i < len; i++) {
      funcs[i]();
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
