class Sphere {
 constructor() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = 10;
  this.speed = 0.5;

  this.direction = createVector();

  this.color = randomColor();
 }

 move() {

  if (random(0,1) < 0.5) {
   this.direction.x += random(-rateOfChange, rateOfChange);
  }

  else {
   this.direction.y += random(-rateOfChange, rateOfChange);
  }

  this.direction.normalize();


  this.x += this.direction.x * this.speed;
  this.y += this.direction.y * this.speed;

  if (this.x <= 0 || this.x >= width) {
    this.direction.x = -this.direction.x;
  }

  if (this.y <= 0 || this.y >= height) {
   this.direction.y = -this.direction.y;
  }

 }

 updateColor() {

 }

 display() {
  strokeWeight(1);
  stroke(this.color);
  fill(this.color)
  ellipse(this.x, this.y, this.diameter, this.diameter);

 }

}
