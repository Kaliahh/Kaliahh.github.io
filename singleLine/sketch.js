function setup() {
  createCanvas(windowWidth, windowHeight);

  lines = [];
  lines.push(new Line(width, height/2, width, height/2));
  p = 0;
}

function draw() {
  background(51);

  if (lines[p].x2 < width) {
    lines.push(
      new Line(
        lines[p].x2,
        lines[p].y2,
        lines[p].x2 + 10,
        getRelativeRandom(lines[p].y2)
      )
    );

    p++;
  }

  for (i = 0; i < lines.length; i++) {
    lines[i].move();
    lines[i].display();
  }
}

function getRelativeRandom(y) {

  number = 0;

  do {
    number = y + random(-20, 20)
  }
  while (number >= height || number <= 0);

  return number;

}


class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  move() {
    this.x1 -= 2;
    this.x2 -= 2;
  }

  display() {
    stroke(color(255,255,255));
    strokeWeight(5)
    line(this.x1, this.y1, this.x2, this.y2);
  }

}
