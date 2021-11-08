function preload() {
  bBishop = loadImage('pieces/bB.png')
  bKing = loadImage('pieces/bK.png')
  bKnight = loadImage('pieces/bN.png')
  bPawn = loadImage('pieces/bP.png')
  bQueen = loadImage('pieces/bQ.png')
  bRook = loadImage('pieces/bR.png')

  wBishop = loadImage('pieces/wB.png')
  wKing = loadImage('pieces/wK.png')
  wKnight = loadImage('pieces/wN.png')
  wPawn = loadImage('pieces/wP.png')
  wQueen = loadImage('pieces/wQ.png')
  wRook = loadImage('pieces/wR.png')
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  squareSize = height / 8;
  boardStart = width / 5;

  filledColor = color(118,150,86)
  unFilledColor = color(238,238,210)

  while (true) {
    whitePieces = [];
    blackPieces = [];
    allPieces = {};

    let checkmate = false;

    setupPieces();  

    while (!checkmate) {
      makePlay(true);

      await sleep(100);

      makePlay(false);

      await sleep(100);
    }
  }
}

function makePlay(whitePlays) {
  let pieces = (whitePlays ? whitePieces : blackPieces);
  let pieceFound = false;

  let p;
  
  while (!pieceFound) {
    let randomPieceIndex = getRandomInt(0, pieces.length);

    p = pieces[randomPieceIndex];

    p.findLegalMoves(allPieces);

    if (p.legalMoves.length != 0) {
      pieceFound = true;
      if (p.attackMoves.length != 0) {
        let randomAttack = getRandomInt(0, p.attackMoves.length);
        p.attack(randomAttack);
      }
      else {
        let randomMove = getRandomInt(0, p.legalMoves.length);
        p.move(randomMove);
      }
    }
  }
}

function draw() {
  background(51);

  drawChessBoard(boardStart);

  drawChessPieces();
}

function drawChessPieces() {
  for (let i = 0; i < whitePieces.length; i++) {
    whitePieces[i].draw()
  }
  for (let i = 0; i < blackPieces.length; i++) {
    blackPieces[i].draw()
  }
}

function drawChessBoard(startX) {
  let filled = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (filled) {
        fill(filledColor)
      }
      else {
        fill(unFilledColor)
      }
      filled = !filled;

      noStroke()
      rect(startX + j * squareSize, i * squareSize, squareSize, squareSize);
    }
    filled = !filled;
  }
}

function setupPieces() {
  whitePieces.push(new Rook(0, 7, true, wRook))
  whitePieces.push(new Knight(1, 7, true, wKnight))
  whitePieces.push(new Bishop(2, 7, true, wBishop))
  whitePieces.push(new Queen(3, 7, true, wQueen))
  whitePieces.push(new King(4, 7, true, wKing))
  whitePieces.push(new Bishop(5, 7, true, wBishop))
  whitePieces.push(new Knight(6, 7, true, wKnight))
  whitePieces.push(new Rook(7, 7, true, wRook))
  
  for (let i = 0; i < 8; i++) {
    whitePieces.push(new Pawn(i, 6, true, wPawn))
  }

  blackPieces.push(new Rook(0, 0, false, bRook))
  blackPieces.push(new Knight(1, 0, false, bKnight))
  blackPieces.push(new Bishop(2, 0, false, bBishop))
  blackPieces.push(new Queen(3, 0, false, bQueen))
  blackPieces.push(new King(4, 0, false, bKing))
  blackPieces.push(new Bishop(5, 0, false, bBishop))
  blackPieces.push(new Knight(6, 0, false, bKnight))
  blackPieces.push(new Rook(7, 0, false, bRook))
  
  for (let i = 0; i < 8; i++) {
    blackPieces.push(new Pawn(i, 1, false, bPawn))
  }



  for (let i = 0; i < whitePieces.length; i++) {
    allPieces[whitePieces[i].position] = whitePieces[i];

    // allPieces.push(whitePieces[i])
  }

  for (let i = 0; i < blackPieces.length; i++) {
    allPieces[blackPieces[i].position] = blackPieces[i];

    // allPieces.push(blackPieces[i])
  }
}