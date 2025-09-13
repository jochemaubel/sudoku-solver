const { expect } = require("@jest/globals");
const Cell = require("./Cell");

test("should set the value of a cell", () => {
  const cell = new Cell(0, 0);
  cell.setValue(3);
  expect(cell.value).toBe(3);
});

test("should throw error if cell already sey", () => {
  const cell = new Cell(0, 0);
  cell.setValue(3);
  expect(() => cell.setValue(2)).toThrow("Cell already set");
});

test("should throw error when cell is set with invalid option", () => {
  const cell = new Cell(0, 0);
  expect(() => cell.setValue(10)).toThrow("Not a valid option for this cell");
});

test("should throw an error when cell is initialized with invalid value", () => {
  expect(() => new Cell(0, 0, 10)).toThrow("Not a valid value for this cell");
});

test("should set options for a cell", () => {
  const cell = new Cell(0, 0);
  cell.setOptions([1, 2]);
  expect(cell.options).toEqual([1, 2]);
});

test("should clear options when value is set", () => {
  const cell = new Cell(0, 0);
  cell.setValue(3);
  expect(cell.options).toEqual([]);
});

test("should have no options when initialized with value", () => {
  const cell = new Cell(0, 0, 3);
  expect(cell.options).toEqual([]);
});

test("should not set options when cell has value", () => {
  const cell = new Cell(0, 0, 3);
  cell.setOptions([1, 2, 3]);
  expect(cell.options).toEqual([]);
});

test("should reset cell", () => {
  const cell = new Cell(0, 0, 3);
  cell.reset();
  expect(cell.value).toBe(0);
  expect(cell.options).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("shoudl remove option from cell", () => {
  const cell = new Cell(0, 0);
  cell.removeOption(3);
  expect(cell.options).toEqual([1, 2, 4, 5, 6, 7, 8, 9]);
});
