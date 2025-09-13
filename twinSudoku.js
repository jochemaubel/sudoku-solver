const fs = require("fs");
const Cell = require("./models/Cell");
const Group = require("./models/Group");
const abstractSudoku = require("./AbstractSudoku");

const twinSudoku = (
  input,
  rows = 9,
  cols = 15,
  blockRows = 3,
  blockCols = 3,
  twinStart = 7,
  twinEnd = 9
) => {
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
    _setRows(cells, groups, rows, twinStart, twinEnd);
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

const _setRows = (cells, groups, rows, twinStart, twinEnd) => {
  for (let i = 0; i < rows; i++) {
    groups.push(
      new Group(cells.filter((cell) => cell.row === i && cell.col < twinEnd))
    );
    groups.push(
      new Group(
        cells.filter((cell) => cell.row === i && cell.col >= twinStart - 1)
      )
    );
  }
};

const _setCols = (cells, groups, cols) => {
  for (let i = 0; i < cols; i++) {
    groups.push(new Group(cells.filter((cell) => cell.col === i)));
  }
};

const _setBlocks = (cells, groups, rows, cols, blockRows, blockCols) => {
  for (let i = 0; i < rows / blockRows; i++) {
    for (let j = 0; j < cols / blockCols; j++) {
      groups.push(
        new Group(
          cells.filter(
            (cell) =>
              cell.row >= i * blockRows &&
              cell.row < (i + 1) * blockRows &&
              cell.col >= j * blockCols &&
              cell.col < (j + 1) * blockCols
          )
        )
      );
    }
  }
};

module.exports = twinSudoku;
