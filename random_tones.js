const tonesTemplate = ["A", "Bb", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

rounds = 0
counter = 12

while (rounds < 12) {
  if (rounds == 0) {
    const tones = [...tonesTemplate];
  }

  index = getRandomInt(0, counter);
  print("Your tone is: " + tones[index])
  tones.splice(index, 1)

  counter -= 1;
  rounds += 1;

  if (rounds == 12) {
    // Something!
  }
  else {

  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
