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
    var randRowIndex = Math.floor(Math.random() * numRows);
    var randColIndex = Math.floor(Math.random() * numCols);
    board[randRowIndex][randColIndex] = 'B';
    numBombsPlaced++;
  }

  return board;
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

var playerBoard = generatePlayerBoard(3,4);
var bombBoard = generateBombBoard(3,4,5);

console.log('PlayerBoard: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);
