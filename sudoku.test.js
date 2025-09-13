const { it, expect } = require("@jest/globals");
const sudoku = require("./sudoku");

const emptyRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const emptySudoku = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const validPuzzle = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
];
const emptyRowPuzzle = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
];
const invalidPuzzle = [
  [9, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
];
const easyPuzzle = [
  [1, 0, 6, 0, 5, 0, 0, 0, 4],
  [5, 0, 7, 8, 0, 0, 6, 0, 0],
  [0, 4, 0, 3, 0, 0, 8, 0, 0],
  [0, 2, 0, 0, 0, 5, 0, 0, 3],
  [7, 0, 0, 4, 0, 3, 0, 6, 0],
  [0, 9, 4, 0, 2, 0, 5, 0, 0],
  [4, 0, 0, 0, 0, 1, 0, 3, 0],
  [0, 0, 5, 0, 0, 6, 0, 4, 2],
  [2, 7, 0, 0, 4, 0, 0, 0, 0],
];
const feasiblePuzzle = [
  [4, 0, 8, 0, 0, 7, 9, 3, 0],
  [3, 7, 6, 0, 0, 2, 0, 5, 8],
  [9, 0, 0, 3, 8, 0, 0, 7, 0],
  [6, 0, 0, 4, 3, 8, 7, 2, 5],
  [2, 8, 5, 0, 0, 1, 3, 4, 0],
  [7, 4, 3, 2, 0, 0, 0, 8, 0],
  [5, 0, 0, 0, 0, 0, 0, 6, 3],
  [8, 0, 0, 0, 2, 0, 5, 1, 7],
  [1, 0, 7, 0, 0, 0, 0, 9, 4],
];
const infeasiblePuzzle = [
  [4, 1, 8, 5, 6, 7, 9, 3, 2],
  [3, 7, 6, 9, 1, 2, 4, 5, 8],
  [9, 5, 2, 3, 8, 4, 1, 7, 6],
  [6, 9, 1, 4, 3, 8, 7, 2, 5],
  [2, 8, 5, 6, 7, 1, 3, 4, 9],
  [7, 4, 3, 2, 9, 5, 6, 8, 1],
  [5, 2, 4, 1, 0, 9, 8, 6, 3],
  [8, 3, 9, 0, 2, 6, 5, 1, 7],
  [1, 6, 7, 8, 5, 3, 2, 9, 4],
];

describe("Sudoku", () => {
  it("should create an empty sudoku", () => {
    const mySudoku = sudoku();
    expect(mySudoku.get()).toEqual(emptySudoku);
  });

  it("should create a predefined sudoku", () => {
    const mySudoku = sudoku(validPuzzle);
    expect(mySudoku.get()).toEqual(validPuzzle);
  });

  it("should create a predefined sudoku from a text input", () => {
    const input = "/Users/Jochem/ReactProjects/tdd/sudoku/easy.txt";
    const mySudoku = sudoku(input);
    expect(mySudoku.get()).toEqual(easyPuzzle);
  });

  it("should set a cell", () => {
    const mySudoku = sudoku();
    mySudoku.setCell(1, 2, 9);
    expect(mySudoku.getCell(1, 2).value).toBe(9);
  });

  it("should invalidate the puzzle", () => {
    const mySudoku = sudoku();
    expect(mySudoku.validate()).toBeFalsy();
  });

  it("should validate the puzzle", () => {
    const myValidSudoku = sudoku(validPuzzle);
    expect(myValidSudoku.validate()).toBeTruthy();
  });

  it("should return true if puzzle is still valid", () => {
    const mySudoku = sudoku();
    expect(mySudoku.isValid()).toBeTruthy();
    const myValidSudoku = sudoku(validPuzzle);
    expect(myValidSudoku.isValid()).toBeTruthy();
  });

  it("should return false if puzzle is no longer valid", () => {
    const mySudoku = sudoku(invalidPuzzle);
    expect(mySudoku.isValid()).toBeFalsy();
  });

  test("should return true if puzzle is feasible", () => {
    const mySudoku = sudoku(feasiblePuzzle);
    expect(mySudoku.isFeasible()).toBeTruthy;
  });

  test("should return false if puzzle is infeasible", () => {
    const mySudoku = sudoku(infeasiblePuzzle);
    expect(mySudoku.isFeasible()).toBeFalsy;
  });

  it("should return no options for cell if cell is already filled in", () => {
    const mySudoku = sudoku(validPuzzle);
    const cellOptions = mySudoku.getCell(0, 0).options;
    expect(cellOptions).toEqual([]);
  });

  it("should return all options for cell in empty sudoku", () => {
    const mySudoku = sudoku();
    const cellOptions = mySudoku.getCell(0, 0).options;
    expect(cellOptions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should return valid options for cell", () => {
    const mySudoku = sudoku(emptyRowPuzzle);
    expect(mySudoku.getCell(0, 0).options).toEqual([1]);
    expect(mySudoku.getCell(0, 7).options).toEqual([8]);
  });

  it("should return valid options for cell", () => {
    const puzzle = [
      [4, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4],
    ];
    const mySudoku = sudoku(puzzle);
    expect(mySudoku.getCell(7, 4).options).toEqual([1, 2, 3, 5, 6, 7, 8, 9]);
  });

  it("should throw error when filled cell is tried to be set", () => {
    const mySudoku = sudoku(validPuzzle);
    expect(() => mySudoku.setCell(5, 5, 1)).toThrow("Cell already set");
  });

  it("should throw error when cell is tried to be set with invalid option", () => {
    const mySudoku = sudoku();
    expect(() => mySudoku.setCell(5, 5, 10)).toThrow(
      "Not a valid option for this cell"
    );
  });

  it("should find a move if a cell has only one option", () => {
    const mySudoku = sudoku(emptyRowPuzzle);
    const move = mySudoku.findMove();
    expect(move.cell.row).toBe(0);
    expect(move.cell.col).toBe(0);
    expect(move.value).toBe(1);
  });

  it("should find a move if a number has one option in a certain group", () => {
    const puzzle = [
      [4, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4],
    ];
    const mySudoku = sudoku(puzzle);
    const move = mySudoku.findMove();
    expect(move.cell.row).toBe(7);
    expect(move.cell.col).toBe(2);
    expect(move.value).toBe(4);
  });

  it("should solve the puzzle when there is a solution", () => {
    const mySudoku = sudoku(emptyRowPuzzle);
    expect(mySudoku.solve()).toEqual(validPuzzle);
  });

  it("should solve an easy puzzle", () => {
    const mySudoku = sudoku(easyPuzzle);
    const solution = [
      [1, 8, 6, 9, 5, 2, 3, 7, 4],
      [5, 3, 7, 8, 1, 4, 6, 2, 9],
      [9, 4, 2, 3, 6, 7, 8, 5, 1],
      [6, 2, 8, 1, 7, 5, 4, 9, 3],
      [7, 5, 1, 4, 9, 3, 2, 6, 8],
      [3, 9, 4, 6, 2, 8, 5, 1, 7],
      [4, 6, 9, 2, 8, 1, 7, 3, 5],
      [8, 1, 5, 7, 3, 6, 9, 4, 2],
      [2, 7, 3, 5, 4, 9, 1, 8, 6],
    ];
    expect(mySudoku.solve()).toEqual(solution);
  });
  it("should solve a medium puzzle", () => {
    const input = "/Users/Jochem/ReactProjects/tdd/sudoku/medium.txt";
    const mySudoku = sudoku(input);
    const solution = [
      [4, 3, 8, 2, 9, 5, 1, 7, 6],
      [2, 5, 9, 7, 6, 1, 8, 4, 3],
      [7, 6, 1, 4, 3, 8, 5, 2, 9],
      [5, 7, 2, 3, 8, 4, 9, 6, 1],
      [3, 9, 4, 6, 1, 7, 2, 8, 5],
      [8, 1, 6, 9, 5, 2, 4, 3, 7],
      [6, 8, 3, 1, 4, 9, 7, 5, 2],
      [9, 2, 5, 8, 7, 3, 6, 1, 4],
      [1, 4, 7, 5, 2, 6, 3, 9, 8],
    ];
    expect(mySudoku.solve()).toEqual(solution);
  });

  it("should solve a hard puzzle", () => {
    const input = "/Users/Jochem/ReactProjects/tdd/sudoku/hard.txt";
    const mySudoku = sudoku(input);
    const solution = [
      [1, 8, 6, 2, 4, 7, 9, 3, 5],
      [9, 5, 2, 6, 8, 3, 4, 7, 1],
      [4, 3, 7, 9, 1, 5, 2, 6, 8],
      [6, 4, 3, 7, 2, 8, 1, 5, 9],
      [8, 1, 5, 3, 9, 6, 7, 2, 4],
      [2, 7, 9, 4, 5, 1, 6, 8, 3],
      [3, 9, 4, 8, 6, 2, 5, 1, 7],
      [7, 6, 1, 5, 3, 9, 8, 4, 2],
      [5, 2, 8, 1, 7, 4, 3, 9, 6],
    ];
    expect(mySudoku.solve()).toEqual(solution);
  });

  it("should solve a very hard puzzle", () => {
    const input = "/Users/Jochem/ReactProjects/tdd/sudoku/veryhard.txt";
    const mySudoku = sudoku(input);
    const solution = [
      [4, 2, 8, 5, 1, 7, 9, 3, 6],
      [3, 7, 6, 9, 4, 2, 1, 5, 8],
      [9, 5, 1, 3, 8, 6, 4, 7, 2],
      [6, 1, 9, 4, 3, 8, 7, 2, 5],
      [2, 8, 5, 7, 6, 1, 3, 4, 9],
      [7, 4, 3, 2, 9, 5, 6, 8, 1],
      [5, 9, 2, 1, 7, 4, 8, 6, 3],
      [8, 3, 4, 6, 2, 9, 5, 1, 7],
      [1, 6, 7, 8, 5, 3, 2, 9, 4],
    ];
    expect(mySudoku.solve()).toEqual(solution);
  });
});
