const fs = require("fs");
const Cell = require("./models/Cell");
const Group = require("./models/Group");
const abstractSudoku = require("./AbstractSudoku");

const sudoku = (input, rows = 9, cols = 9, blockRows = 3, blockCols = 3) => {
  const arr = _createArr(input);
  let _sudoku = _create(arr, rows, cols);
  let cells = [];
  let groups = [];

  const setCells = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        cells.push(new Cell(i, j, _sudoku[i][j]));
      }
    }
  };

  const setGroups = () => {
    _setRows(cells, groups, rows);
    _setCols(cells, groups, cols);
    _setBlocks(cells, groups, rows, cols, blockRows, blockCols);
  };

  setCells();
  setGroups();

  return abstractSudoku(_sudoku, cells, groups);
};

const _create = (input, rows, cols) =>
  input
    ? input
    : Array.from({ length: cols }, () => Array.from({ length: rows }, () => 0));

const _createArr = (input) => {
  if (typeof input === "string") {
    const data = fs.readFileSync(input, "utf-8");
    return data.split("\n").map((row) => row.split("").map(Number));
  }
  return input;
};

const _setRows = (cells, groups, rows) => {
  for (let i = 0; i < rows; i++) {
    groups.push(new Group(cells.filter((cell) => cell.row === i), [1, 2, 3, 4, 5, 6, 7, 8, 9], 'row', i));
  }
};

const _setCols = (cells, groups, cols) => {
  for (let i = 0; i < cols; i++) {
    groups.push(new Group(cells.filter((cell) => cell.col === i), [1, 2, 3, 4, 5, 6, 7, 8, 9], 'col', i));
  }
};

const _setBlocks = (cells, groups, rows, cols, blockRows, blockCols) => {
  for (let i = 0; i < rows / blockRows; i++) {
    for (let j = 0; j < cols / blockCols; j++) {
      const blockIndex = i * 3 + j; // 0-8 voor de 9 blokken
      groups.push(
        new Group(
          cells.filter(
            (cell) =>
              cell.row >= i * blockRows &&
              cell.row < (i + 1) * blockRows &&
              cell.col >= j * blockCols &&
              cell.col < (j + 1) * blockCols
          ),
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          'block',
          blockIndex
        )
      );
    }
  }
};

module.exports = sudoku;
