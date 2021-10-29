async function setup() {
  createCanvas(windowWidth, windowHeight);
  
  unmarked = color(255, 255, 255)
  marked = color(255, 0, 0)
  
  values = [];
  
  size = 20;
  
  p = floor(width / size);

  for (let i = 0; i < p; i++) {
    values.push(new Rectangle(map(i, 0, p - 1, p / 3, height)));
  }
  
  for (let i = 0; i < 10; i++) {
    await shuffleArray(values);
    await MergeSort(values, 0, values.length - 1);
    await sleep(500)
    await shuffleArray(values);
    await QuickSort(values, 0, values.length - 1);
    await sleep(500)
    await shuffleArray(values);
    await HeapSort(values, values.length);
    await sleep(500)
    await shuffleArray(values);
    await BubbleSort(values, values.length);
    await sleep(500)
  }
  
  console.log("Hello!")
}




function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(values[i].color);
    rect(i * size, height - values[i].value, size - 1, values[i].value);
  }

}