class Game{
  constructor(numRows, numCols, numBombs){
    this._board = new Board(numRows, numCols, numBombs);
  }

  playMove(rowIndex, colIndex){
    this._board.flipTile(rowIndex, colIndex);
    if(this._board.playerBoard[rowIndex][colIndex] === 'B'){
      console.log("Game Over");
      this._board.print();
    }else if(!this._board.hasSafeTiles()){
      console.log('Congratulations, you won!');
    }else{
      console.log('Current board:');
      this._board.print();
    }
  }
}

class Board{
  constructor(numOfRows, numOfCols, numOfBombs){
    this._numOfBombs = numOfBombs;
    this._numOfTiles = numOfRows * numOfCols;
    this._playerBoard = Board.generatePlayerBoard(numOfRows, numOfCols);
    this._bombBoard = Board.generateBombBoard(numOfRows, numOfCols, numOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, colIndex){
    if(this._playerBoard[rowIndex][colIndex] !== ' '){
      console.log("This tile has already been flipped!");
      return;
    }else if(this._bombBoard[rowIndex][colIndex] === 'B'){
      this._playerBoard[rowIndex][colIndex] = 'B';
    }else{
      this._playerBoard[rowIndex][colIndex] =
        this.getNumofNeighborBombs(rowIndex, colIndex);
    }
    this._numOfTiles--;
  }

  getNumofNeighborBombs(rowIndex, colIndex){
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

    const numOfRows = this._bombBoard.length;
    const numOfCols = this._bombBoard[0].length;

    let numOfBombs = 0;

    neighborOffsets.forEach(offset =>{
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numOfRows &&
          neighborColIndex >= 0 && neighborColIndex < numOfCols){
            if(this._bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
              numOfBombs++;
            }
          }
    });
    return numOfBombs;
  }

  hasSafeTiles(){
    return this._numOfTiles !== this._numOfBombs;
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numRows,numCols){
    const board = [];
    for(var i = 0; i < numRows; i++){
      const row = [];
      for(var j = 0; j < numCols; j++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numRows, numCols, numBombs){
    const board = [];

    for(var i = 0; i < numRows; i++){
      const row = [];
      for(var j = 0; j < numCols; j++){
        row.push(null);
      }
      board.push(row);
    }

    let numBombsPlaced = 0;

    while( numBombsPlaced <= numBombs){
      const randRowIndex = Math.floor(Math.random() * numRows);
      const randColIndex = Math.floor(Math.random() * numCols);
      if(board[randRowIndex][randColIndex] !== 'B'){
        board[randRowIndex][randColIndex] = 'B';
        numBombsPlaced++;
      }
    }
    return board;
  }
}

const g = new Game(3,3,3);
g.playMove(0,0);
g.playMove(2,1);
