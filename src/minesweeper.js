const generatePlayerBoard = (numRows,numCols) => {
  const board = [];
  for(var i = 0; i < numRows; i++){
    const row = [];
    for(var j = 0; j < numCols; j++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numRows, numCols, numBombs) => {
  const board = [];

  for(var i = 0; i < numRows; i++){
    const row = [];
    for(var j = 0; j < numCols; j++){
      row.push(null);
    }
    board.push(row);
  }

  numBombsPlaced = 0;

  while( numBombsPlaced <= numBombs){
    let randRowIndex = Math.floor(Math.random() * numRows);
    let randColIndex = Math.floor(Math.random() * numCols);
    if(board[randRowIndex][randColIndex] !== 'B'){
      board[randRowIndex][randColIndex] = 'B';
      numBombsPlaced++;
    }
  }

  return board;
};

const getNumofNeighborBombs =
  (bombBoard, rowIndex, colIndex) => {
  const neighborOffsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0, 1],
    [1,-1],
    [1, 0],
    [1, 1]
  ];

  const numOfRows = bombBoard.length;
  const numOfCols = bombBoard[0].length;

  let numOfBombs = 0;

  neighborOffsets.forEach(offset =>{
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColIndex = colIndex + offset[1];
    if((neighborRowIndex >= 0 && neighborRowIndex < numOfRows) &&
        neighborColIndex >= 0 && neighborColIndex < numOfColumns){
          if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numOfBombs++;
          }
        }
  });
  return numOfBombs;
};

const flipTile = (playerBoard, bombBoard,rowIndex, colIndex) => {
  if(playerBoard[rowIndex][colIndex] !== ' '){
    console.log("This tile has already been flipped!");
    return;
  }else if(bombBoard[rowIndex][colIndex] === 'B'){
    playerBoard[rowIndex][colIndex] === 'B';
  }else{
    playerBoard[rowIndex][colIndex] =
      getNumofNeighborBombs(bombBoard, rowIndex, colIndex);
  }
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

var playerBoard = generatePlayerBoard(3,4);
var bombBoard = generateBombBoard(3,4,5);

console.log('PlayerBoard: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log("Updated Player Board: ");
printBoard(playerBoard);
