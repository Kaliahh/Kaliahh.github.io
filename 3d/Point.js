class Point {
  constructor(x, y, z, diameter) {
    
    if (x == null && y == null && z == null && diameter == null) {
      // https://datagenetics.com/blog/january32020/index.html
      let theta = random(0,TWO_PI);
      let v = random(0,1);
      let phi = Math.acos((2*v)-1);
      let r = Math.pow(random(0,1), 1/3);
      r = r * axisLength;
      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.sin(phi) * Math.sin(theta);
      z = r * Math.cos(phi);
      diameter = 10
    }


    
    
    this.position = createVector(x, y, z)
    this.diameter = diameter
    this.color = color(255, 255, 255)
    this.centroid = null
    this.distanceToCentroid = 0;
    
    this.visited = false;
    this.noise = false;
    this.corePoint = false;
  }
  
  display() {
    stroke(this.color)
    strokeWeight(this.diameter)
    point(this.position.x, this.position.y, this.position.z)
  }

  displayNeighborhood(epsilon) {
    this.color.setAlpha(2);
    push();
    fill(this.color)
    noStroke()
    // fill(color(255,255,255,0))
    // strokeWeight(1)
    // stroke(this.color)
    translate(this.position)
    sphere(epsilon)
    pop();
    this.color.setAlpha(255);
  }
}