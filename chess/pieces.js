class Piece {
  constructor(x, y, isWhite, image) {
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
    this.image = image;

    this.hasMoved = false;

    this.legalMoves = [];
    this.attackMoves = [];
  }


  findLegalMoves() {

  }

  move() {

  }

  draw() {
    image(this.image, 
          boardStart + this.x * squareSize, 
          this.y * squareSize, 
          squareSize, 
          squareSize)
  }
}


class King extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }
}

class Queen extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }

  move() {
    // Tjek for angreb

    if (hasMoved) {
      // Can go one forward
    }
    else {
      // Can go one or two forward
    }
  }
}