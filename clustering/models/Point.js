class Point {
  constructor(x, y, diameter) {
    
    if (x == null && y == null && diameter == null) {
      x = random(20, width - 20)
      y = random(20, height - 20)
      diameter = 10
    }
    
    this.position = createVector(x, y)
    this.diameter = diameter
    this.color = color(255, 255, 255)
    this.centroid = null
    this.distanceToCentroid = 0;
    
    this.visited = false;
    this.noise = false;
  }
  
  display() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
  }

  displayNeighborhood(epsilon) {
    this.color.setAlpha(50);
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, epsilon * 2, epsilon * 2)
    this.color.setAlpha(255);
  }
}
