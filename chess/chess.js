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

  whitePieces = [];
  blackPieces = [];

  let checkmate = false;

  setupPieces();  
}

function draw() {
  background(51);

  drawChessBoard(boardStart);

  drawChessPieces();
}

function drawChessPieces() {
  for (let i = 0; i < whitePieces.length; i++) {
    drawPiece(whitePieces[i])
  }
  for (let i = 0; i < blackPieces.length; i++) {
    drawPiece(blackPieces[i])
  }
}

function drawPiece(piece) {
  image(piece.image, 
        boardStart + piece.x * squareSize, 
        piece.y * squareSize, 
        squareSize, 
        squareSize)
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
  whitePieces.push(new Piece(0, 7, true, wRook))
  whitePieces.push(new Piece(1, 7, true, wKnight))
  whitePieces.push(new Piece(2, 7, true, wBishop))
  whitePieces.push(new Piece(3, 7, true, wQueen))
  whitePieces.push(new Piece(4, 7, true, wKing))
  whitePieces.push(new Piece(5, 7, true, wBishop))
  whitePieces.push(new Piece(6, 7, true, wKnight))
  whitePieces.push(new Piece(7, 7, true, wRook))
  
  for (let i = 0; i < 8; i++) {
    whitePieces.push(new Piece(i, 6, true, wPawn))
  }

  blackPieces.push(new Piece(0, 0, false, bRook))
  blackPieces.push(new Piece(1, 0, false, bKnight))
  blackPieces.push(new Piece(2, 0, false, bBishop))
  blackPieces.push(new Piece(3, 0, false, bQueen))
  blackPieces.push(new Piece(4, 0, false, bKing))
  blackPieces.push(new Piece(5, 0, false, bBishop))
  blackPieces.push(new Piece(6, 0, false, bKnight))
  blackPieces.push(new Piece(7, 0, false, bRook))
  
  for (let i = 0; i < 8; i++) {
    blackPieces.push(new Piece(i, 1, false, bPawn))
  }
}