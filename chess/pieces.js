class Piece {
  constructor(x, y, isWhite, image) {
    this.x = x
    this.y = y
    this.isWhite = isWhite;
    this.image = image;

    this.legalMoves = [];
    this.attackMoves = [];
  }


  findLegalMoves(allPieces) {

  }

  move(x, y, allPieces) {
    allPieces[this.y][this.x] = null;
    
    this.x = x;
    this.y = y;
    this.hasMoved = true;

    allPieces[this.y][this.x] = this;

    this.legalMoves = []
  }

  attack(x, y, allPieces, pieceSet) {
    allPieces[this.y][this.x] = null;
    pieceSet.splice(pieceSet.indexOf(allPieces[y][x]), 1);
    
    this.x = x;
    this.y = y;
    this.hasMoved = true;

    allPieces[this.y][this.x] = this;

    this.legalMoves = []
    this.attackMoves = []
  }

  draw() {
    image(this.image, 
          boardStart + this.x * squareSize, 
          this.y * squareSize, 
          squareSize, 
          squareSize)
  }

  moveOffBoard(x, y) {
    if (y >= 8 || y < 0 || x >= 8 || x < 0) {
      return true;
    }
    return false;
  }

  checkMoveAndAttack(x, y, allPieces) {
    let a = this.checkMove(x, y, allPieces);
    let b = this.checkAttack(x, y, allPieces);

    return a && b;
  }

  checkMoveOrAttack(x, y, allPieces) {
    let a = this.checkMove(x, y, allPieces);
    let b = this.checkAttack(x, y, allPieces);

    return a || b;
  }

  checkMove(x, y, allPieces) {
    if (!this.moveOffBoard(x, y)) {
      if (allPieces[y][x] == null) {
        this.legalMoves.push([x, y]);
        return true;
      }
    }

    return false;
  }

  checkAttack(x, y, allPieces) {
    if (!this.moveOffBoard(x, y)) {
      if (allPieces[y][x] != null && allPieces[y][x].isWhite != this.isWhite) {
        this.attackMoves.push([x, y]);
        this.legalMoves.push([x, y]);
        return true;
      }
    }
    return false;
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);

    this.hasMoved = false;
  }

  findLegalMoves(allPieces) {
    let direction;

    if (this.isWhite) {
      direction = -1;
    }
    else {
      direction = 1;
    }

    if (!this.hasMoved) {
      let m = this.checkMove(this.x, this.y + direction, allPieces)
      if (m) {
        this.checkMove(this.x, this.y + (direction * 2), allPieces)
      }
    }
    else {
      this.checkMove(this.x, this.y + direction, allPieces)
    }
    
    this.checkAttack(this.x - 1, this.y + direction, allPieces);
    this.checkAttack(this.x + 1, this.y + direction, allPieces)
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

