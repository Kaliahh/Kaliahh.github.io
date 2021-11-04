class Ball {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = p5.Vector.random2D();

    this.diameter = random(10,30);
    this.radius = this.diameter / 2;

    this.speed = random(50,100);

    this.color = randomColor();
  }


  calculateVelocity() {
    if (random(0,1) < 0.5) {
      this.velocity.x += random(-rateOfChange, rateOfChange);
    }

    else {
      this.velocity.y += random(-rateOfChange, rateOfChange);
    }


    for (let k = 0; k < balls.length; k++) {
      if (balls[k] == this) {
        continue;
      }
      else if (distance(balls[k], this) <= balls[k].radius + this.radius) {
        collide(this, balls[k]);
      }
    }

    if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= height) {
      this.velocity.y = -this.velocity.y;
    }

    this.velocity.normalize();
  }



  move() {
    this.position.add(this.velocity);
  }

 display() {
  fill(this.color);
  noStroke();
  ellipse(this.position.x, this.position.y, this.diameter, this.diameter);

 }  
}
