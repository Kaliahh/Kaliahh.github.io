class Piece {
  constructor(x, y, isWhite, image) {
    this.position = new Position(x, y)
    this.isWhite = isWhite;
    this.image = image;

    this.legalMoves = [];
    this.attackMoves = [];
  }


  findLegalMoves(allPieces) {

  }

  move(x, y) {

  }

  attack(x, y) {

  }

  draw() {
    image(this.image, 
          boardStart + this.x * squareSize, 
          this.y * squareSize, 
          squareSize, 
          squareSize)
  }

  moveOffBoard(pos) {
    if (pos.y >= 8 || pos.y < 0 || pos.x >= 8 || pos.x < 0) {
      return true;
    }
    return false;
  }

  checkMove(pos, allPieces) {
    if (!moveOffBoard(pos)) {
      if (allPieces[pos] == undefined) {
        this.legalMoves.push(pos);
      }
    }
  }

  checkAttack(pos, allPieces) {
    if (!moveOffBoard(pos)) {
      if (allPieces[pos] != undefined && allPieces[pos].isWhite != this.isWhite) {
        this.attackMoves.push(pos);
        this.legalMoves.push(pos);
      }
    }
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
      direction = 1;
    }
    else {
      direction = -1;
    }

    if (this.hasMoved) {
      let possibleMove = new Position(this.position.x, this.position.y + (direction * 2))
      this.checkMove(possibleMove, allPieces)
    }
    
    let possibleMove = new Position(this.position.x, this.position.y + direction)
    this.checkMove(possibleMove, allPieces)

    let possibleAttack = new Position(this.position.x - 1, this.position.y + direction)
    this.checkAttack(possibleAttack, allPieces);

    possibleAttack = new Position(this.position.x + 1, this.position.y + direction)
    this.checkAttack(possibleAttack, allPieces)
  }

  

  move(pos) {
    
  }

  attack(pos) {
    
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

