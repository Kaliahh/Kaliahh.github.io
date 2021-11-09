async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(51);

  

}

function draw() {
  background(51);
  // rotateZ(radians(15))
  // rotateX(radians(15))
  rotateY(millis() / 1000);
  strokeWeight(5)
  stroke(255)
  line(0, 0, 400, 0)
  
}