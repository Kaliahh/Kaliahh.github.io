class Piece {
  constructor(x, y, isWhite) {
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;

    this.hasMoved = false;

    this.legalMoves = [];
    this.attackMoves = [];
  }


  findLegalMoves() {

  }

  move() {

  }
}


class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
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