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
  filledRecentColor = color(246,246,105)
  unfilledRecentColor = color(186,202,43)

  while (true) {
    whitePieces = [];
    blackPieces = [];
    allPieces = getCleanBoard();

    let stop = false;

    setupPieces();  

    while (true) {
      await sleep(500);

      stop = await makePlay(true);
      if (stop) {
        break;
      }

      // console.log(allPieces)

      await sleep(500);

      stop = await makePlay(false);
      if (stop) {
        break;
      }

      // console.log(allPieces)
    }

    await sleep(2000)
  }
}

async function makePlay(whitePlays) {
  let pieces = (whitePlays ? whitePieces : blackPieces);
  let otherPieces = (whitePlays ? blackPieces : whitePieces);
  let pieceFound = false;

  let p;

  shuffleArray(pieces);

  for (let i = 0; i < pieces.length; i++) {

    p = pieces[i];

    p.findLegalMoves(allPieces);

    if (p.legalMoves.length != 0) {
      pieceFound = true;
      if (p.attackMoves.length != 0) {
        let randomAttack = getRandomInt(0, p.attackMoves.length);

        let a = p.attackMoves[randomAttack];

        p.attack(a[0], a[1], allPieces, otherPieces);
      }
      else {
        let randomMove = getRandomInt(0, p.legalMoves.length);

        let a = p.legalMoves[randomMove];
         
        p.move(a[0], a[1], allPieces);
      }
      break
    }
  } 

  if (!pieceFound) {
    return true;
  }
  else {
    return false;
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

  // whitePieces.push(new Pawn(0, 6, true, wPawn))

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

  // blackPieces.push(new Pawn(0, 5, false, bPawn))

  for (let i = 0; i < whitePieces.length; i++) {
    allPieces[whitePieces[i].y][whitePieces[i].x] = whitePieces[i]
  }

  for (let i = 0; i < blackPieces.length; i++) {
    allPieces[blackPieces[i].y][blackPieces[i].x] = blackPieces[i]
  }
}

function getCleanBoard() {
  let n = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]

  return n;
}