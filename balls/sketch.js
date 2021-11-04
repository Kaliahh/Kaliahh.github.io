function setup() {
  createCanvas(windowWidth, windowHeight);

  rateOfChange = 0.25;

  balls = [];
  amount = width / 5;



  for (j = 0; j < amount; j++) {
    balls.push(new Ball());
  }

  for (j = 0; j < balls.length; j++) {
    findCoordinate(balls[j])
  }
}

function draw() {
  background(51);

  for (i = 0; i < balls.length; i++) {
    balls[i].calculateVelocity();
  }

  for (i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
}

function randomColor() {
  return color(random(100,255), random(100,255), random(100,255));
}



class SphereCollider2D {
  constructor(diameter) {
    this.radius = diameter / 2;
  }


}

function distance(a, b) {
  return sqrt(pow(a.position.x - b.position.x, 2) + pow(a.position.y - b.position.y, 2));
}


function findCoordinate(ball) {
  i = 0;
  while (i < balls.length) {
    if (balls[i] == ball) {
      i++;
      continue;
    }
    else if (distance(balls[i], ball) < balls[i].radius + ball.radius + 1) {
      x = random(20, width - 20);
      y = random(20, height - 20);
      ball.position.set(x, y)
      i = -1;
    }

    i++;
  }
}

function collide(a, b) {
  s = p5.Vector.sub(a.position, b.position);
  s.normalize();

  tA = p5.Vector.dot(a.velocity, s);
  tB = p5.Vector.dot(b.velocity, s);

  p = min((2 * (tA - tB)) / 2, 0);

  a.velocity.x = a.velocity.x - (p * s.x);
  a.velocity.y = a.velocity.y - (p * s.y);
}
