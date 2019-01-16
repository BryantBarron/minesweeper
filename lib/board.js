'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numOfRows, numOfCols, numOfBombs) {
    _classCallCheck(this, Board);

    this._numOfBombs = numOfBombs;
    this._numOfTiles = numOfRows * numOfCols;
    this._playerBoard = Board.generatePlayerBoard(numOfRows, numOfCols);
    this._bombBoard = Board.generateBombBoard(numOfRows, numOfCols, numOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, colIndex) {
      if (this._playerBoard[rowIndex][colIndex] !== ' ') {
        console.log("This tile has already been flipped!");
        return;
      } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
        this._playerBoard[rowIndex][colIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][colIndex] = this.getNumofNeighborBombs(rowIndex, colIndex);
      }
      this._numOfTiles--;
    }
  }, {
    key: 'getNumofNeighborBombs',
    value: function getNumofNeighborBombs(rowIndex, colIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      var numOfRows = this._bombBoard.length;
      var numOfCols = this._bombBoard[0].length;

      var numOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = colIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numOfRows && neighborColIndex >= 0 && neighborColIndex < numOfCols) {
          if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
            numOfBombs++;
          }
        }
      });
      return numOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numOfTiles !== this._numOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numRows, numCols) {
      var board = [];
      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numRows, numCols, numBombs) {
      var board = [];

      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
          row.push(null);
        }
        board.push(row);
      }

      var numBombsPlaced = 0;

      while (numBombsPlaced <= numBombs) {
        var randRowIndex = Math.floor(Math.random() * numRows);
        var randColIndex = Math.floor(Math.random() * numCols);
        if (board[randRowIndex][randColIndex] !== 'B') {
          board[randRowIndex][randColIndex] = 'B';
          numBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();