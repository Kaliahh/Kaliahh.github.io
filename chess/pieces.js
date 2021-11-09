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

  checkIfNotMoveThenAttack(x, y, allPieces) {
    let a = this.checkMove(x, y, allPieces)

    if (a == false) {
      this.checkAttack(x, y, allPieces)
      return true;
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

  findLegalMoves(allPieces) {

    this.checkIfNotMoveThenAttack(this.x + 1, this.y, allPieces);
    this.checkIfNotMoveThenAttack(this.x - 1, this.y, allPieces);
    this.checkIfNotMoveThenAttack(this.x, this.y + 1, allPieces);
    this.checkIfNotMoveThenAttack(this.x, this.y - 1, allPieces);
    this.checkIfNotMoveThenAttack(this.x + 1, this.y + 1, allPieces);
    this.checkIfNotMoveThenAttack(this.x - 1, this.y - 1, allPieces);
    this.checkIfNotMoveThenAttack(this.x + 1, this.y - 1, allPieces);
    this.checkIfNotMoveThenAttack(this.x - 1, this.y + 1, allPieces);
  }
}

class Queen extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }

  findLegalMoves(allPieces) {
    let stopPosX = false;
    let stopNegX = false;
    let stopPosY = false;
    let stopNegY = false;

    let stopPosPos = false;
    let stopNegNeg = false;
    let stopPosNeg = false;
    let stopNegPos = false;

    for (let i = 1; i < 8; i++) {
      if (!stopPosX) {
        stopPosX = this.checkIfNotMoveThenAttack(this.x + i, this.y, allPieces);
      }

      if (!stopNegX) {
        stopNegX = this.checkIfNotMoveThenAttack(this.x - i, this.y, allPieces);
      }

      if (!stopPosY) {
        stopPosY = this.checkIfNotMoveThenAttack(this.x, this.y + i, allPieces);
      }

      if (!stopNegY) {
        stopNegY = this.checkIfNotMoveThenAttack(this.x, this.y - i, allPieces);
      }

      if (!stopPosPos) {
        stopPosPos = this.checkIfNotMoveThenAttack(this.x + i, this.y + i, allPieces);
      }

      if (!stopNegNeg) {
        stopNegNeg = this.checkIfNotMoveThenAttack(this.x - i, this.y - i, allPieces);
      }

      if (!stopPosNeg) {
        stopPosNeg = this.checkIfNotMoveThenAttack(this.x + i, this.y - i, allPieces);
      }

      if (!stopNegPos) {
        stopNegPos = this.checkIfNotMoveThenAttack(this.x - i, this.y + i, allPieces);
      }
    }
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }

  findLegalMoves(allPieces) {
    let stopPosPos = false;
    let stopNegNeg = false;
    let stopPosNeg = false;
    let stopNegPos = false;

    for (let i = 1; i < 8; i++) {
      if (!stopPosPos) {
        stopPosPos = this.checkIfNotMoveThenAttack(this.x + i, this.y + i, allPieces);
      }

      if (!stopNegNeg) {
        stopNegNeg = this.checkIfNotMoveThenAttack(this.x - i, this.y - i, allPieces);
      }

      if (!stopPosNeg) {
        stopPosNeg = this.checkIfNotMoveThenAttack(this.x + i, this.y - i, allPieces);
      }

      if (!stopNegPos) {
        stopNegPos = this.checkIfNotMoveThenAttack(this.x - i, this.y + i, allPieces);
      }
    }
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }

  findLegalMoves(allPieces) {

    let stopPosX = false;
    let stopNegX = false;
    let stopPosY = false;
    let stopNegY = false;

    for (let i = 1; i < 8; i++) {
      if (!stopPosX) {
        stopPosX = this.checkIfNotMoveThenAttack(this.x + i, this.y, allPieces);
      }

      if (!stopNegX) {
        stopNegX = this.checkIfNotMoveThenAttack(this.x - i, this.y, allPieces);
      }

      if (!stopPosY) {
        stopPosY = this.checkIfNotMoveThenAttack(this.x, this.y + i, allPieces);
      }

      if (!stopNegY) {
        stopNegY = this.checkIfNotMoveThenAttack(this.x, this.y - i, allPieces);
      }
    }
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite, image) {
    super(x, y, isWhite, image);
  }

  findLegalMoves(allPieces) {
    this.checkMoveOrAttack(this.x - 1, this.y - 2, allPieces)
    this.checkMoveOrAttack(this.x - 1, this.y + 2, allPieces)

    this.checkMoveOrAttack(this.x + 1, this.y - 2, allPieces)
    this.checkMoveOrAttack(this.x + 1, this.y + 2, allPieces)

    this.checkMoveOrAttack(this.x - 2, this.y - 1, allPieces)
    this.checkMoveOrAttack(this.x - 2, this.y + 1, allPieces)

    this.checkMoveOrAttack(this.x + 2, this.y - 1, allPieces)
    this.checkMoveOrAttack(this.x + 2, this.y + 1, allPieces)
  }
}

