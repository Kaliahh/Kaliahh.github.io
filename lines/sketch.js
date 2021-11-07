let spheres = [];
let rateOfChange = 0.2;

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  time = frameCount;

  let amountOfSpheres = width / 6;

  for (i = 0; i < amountOfSpheres; i++) {
   spheres.push(new Sphere());
  }

}

function draw() {

  for (i = 0; i < spheres.length; i++) {
    spheres[i].move();
    spheres[i].updateColor();
    spheres[i].display();
    }

  if (frameCount > time + 1000) {
    background(51);
    time = frameCount;
  }
}

function randomColor() {
  return color(random(100,255), random(100,255), random(100,255));
}
