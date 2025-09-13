const Group = require("./Group");
const Cell = require("./Cell");
const { expect } = require("@jest/globals");

test("should have", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.hasCell(cells[3])).toBeTruthy();
});

test("should return all cell values", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.values()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
});

test("should be valid for cells with no values", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.isValid()).toBeTruthy();
});

test("should be valid for cells with correct values", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, i));
  }
  const group = new Group(cells);
  expect(group.isValid()).toBeTruthy();
});
test("should be invalid if value exists more than once", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, 1));
  }
  const group = new Group(cells);
  expect(group.isValid()).toBeFalsy();
});

test("should not validate for cells with no values", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.validate()).toBeFalsy();
});

test("should validate for cells with correct values", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, i));
  }
  const group = new Group(cells);
  expect(group.validate()).toBeTruthy();
});

test("should return correct options", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.remainingValues()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  cells[7].setValue(8);
  cells[5].setValue(6);
  cells[3].setValue(4);
  expect(group.remainingValues()).toEqual([1, 2, 3, 5, 7, 9]);
});

test("should find correct possible moves", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  cells.forEach((cell) => cell.setOptions([]));
  expect(group.possibleMoves()).toEqual([]);
  cells[0].setOptions([1, 2]);
  const possibleMoves = group.possibleMoves();
  expect(possibleMoves.length).toBe(2);
  expect(possibleMoves[0].value).toBe(1);
  expect(possibleMoves[1].value).toBe(2);
});

test("should find correct only moves", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  expect(group.onlyMoves()).toEqual([]);
  cells.forEach((cell) => cell.setOptions([]));
  expect(group.possibleMoves()).toEqual([]);
  cells[0].setOptions([1, 2, 3]);
  cells[1].setOptions([2, 3]);
  const onlyMoves = group.onlyMoves();
  expect(onlyMoves.length).toBe(1);
  expect(onlyMoves[0].value).toBe(1);
});

test("should find cells with the same options", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, i));
  }
  const group = new Group(cells);
  cells[0].reset([1, 2]);
  cells[1].reset([1, 2]);
  cells[2].reset([1, 2, 3]);
  cells[3].reset([3, 4]);
  cells[4].reset([3, 4]);
  cells[5].reset([7, 8, 9]);
  cells[6].reset([7, 8, 9]);

  expect(group.findSubGroups()).toEqual([
    [cells[0], cells[1]],
    [cells[3], cells[4]],
  ]);
});

test("should remove subgroup options from other cells", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, i));
  }
  const group = new Group(cells);
  cells[0].reset([1, 2]);
  cells[1].reset([1, 2]);
  cells[2].reset([1, 2, 3]);
  group.removeSubGroupOptions();
  expect(group.cells[2].options).toEqual([3]);
  expect(group.cells[0].options).toEqual([1, 2]);
});

test("should track changed cells when removing options", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i, i));
  }
  const group = new Group(cells);
  cells[0].reset([1, 2]);
  cells[1].reset([1, 2]);
  cells[2].reset([1, 2, 3]);
  group.removeSubGroupOptions();
  expect(group.cellsChanged).toEqual([cells[2]]);
  group.removeSubGroupOptions();
  expect(group.cellsChanged).toEqual([]);
});

test("should remove option from cells", () => {
  let cells = [];
  for (let i = 1; i < 10; i++) {
    cells.push(new Cell(0, i));
  }
  const group = new Group(cells);
  group.removeOption([cells[0]], 9);
  expect(cells[0].options).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  expect(cells[1].options).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
