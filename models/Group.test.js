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

describe("Hidden Pairs/Triples elimination", () => {
  test("should detect and eliminate Hidden Pair", () => {
    // Setup: Rij waar cijfers 4 en 7 alleen in cel 0 en 4 kunnen
    let cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(new Cell(0, i));
    }
    const group = new Group(cells);
    
    // Cel 0: [1, 4, 7] - kan 4 en 7
    // Cel 1: [2, 5, 8] - kan geen 4 of 7
    // Cel 2: [1, 2, 6] - kan geen 4 of 7  
    // Cel 3: [3, 8, 9] - kan geen 4 of 7
    // Cel 4: [1, 4, 7] - kan 4 en 7
    // Cel 5: [2, 5, 8] - kan geen 4 of 7
    // Overige cellen: geen opties (al gevuld)
    cells[0].setOptions([1, 4, 7]);
    cells[1].setOptions([2, 5, 8]);
    cells[2].setOptions([1, 2, 6]);
    cells[3].setOptions([3, 8, 9]);
    cells[4].setOptions([1, 4, 7]);
    cells[5].setOptions([2, 5, 8]);
    cells[6].setOptions([]);
    cells[7].setOptions([]);
    cells[8].setOptions([]);
    
    // Cijfers 4 en 7 kunnen alleen in cel 0 en 4 → Hidden Pair
    group.removeHiddenSubGroups();
    
    // Na Hidden Pair eliminatie:
    // Cel 0 moet alleen [4, 7] hebben (1 geëlimineerd)
    // Cel 4 moet alleen [4, 7] hebben (1 geëlimineerd)
    expect(cells[0].options).toEqual([4, 7]);
    expect(cells[4].options).toEqual([4, 7]);
    
    // Andere cellen ongewijzigd
    expect(cells[1].options).toEqual([2, 5, 8]);
    expect(cells[2].options).toEqual([1, 2, 6]);
    expect(cells[3].options).toEqual([3, 8, 9]);
    expect(cells[5].options).toEqual([2, 5, 8]);
  });

  test("should detect and eliminate Hidden Triple", () => {
    // Setup: Rij waar cijfers 1, 5, 9 alleen in cel 0, 2, 6 kunnen
    let cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(new Cell(0, i));
    }
    const group = new Group(cells);
    
    // Cel 0: [1, 2, 5, 9] - kan 1, 5, 9
    // Cel 1: [2, 3, 4] - kan geen 1, 5, 9
    // Cel 2: [1, 3, 5, 9] - kan 1, 5, 9
    // Cel 3: [2, 3, 4] - kan geen 1, 5, 9
    // Cel 4: [2, 3, 4] - kan geen 1, 5, 9
    // Cel 5: [2, 3, 4] - kan geen 1, 5, 9
    // Cel 6: [1, 4, 5, 9] - kan 1, 5, 9
    // Overige cellen: geen opties
    cells[0].setOptions([1, 2, 5, 9]);
    cells[1].setOptions([2, 3, 4]);
    cells[2].setOptions([1, 3, 5, 9]);
    cells[3].setOptions([2, 3, 4]);
    cells[4].setOptions([2, 3, 4]);
    cells[5].setOptions([2, 3, 4]);
    cells[6].setOptions([1, 4, 5, 9]);
    cells[7].setOptions([]);
    cells[8].setOptions([]);
    
    // Cijfers 1, 5, 9 kunnen alleen in cel 0, 2, 6 → Hidden Triple
    group.removeHiddenSubGroups();
    
    // Na Hidden Triple eliminatie:
    expect(cells[0].options).toEqual([1, 5, 9]);
    expect(cells[2].options).toEqual([1, 5, 9]);
    expect(cells[6].options).toEqual([1, 5, 9]);
    
    // Andere cellen ongewijzigd
    expect(cells[1].options).toEqual([2, 3, 4]);
    expect(cells[3].options).toEqual([2, 3, 4]);
    expect(cells[4].options).toEqual([2, 3, 4]);
    expect(cells[5].options).toEqual([2, 3, 4]);
  });

  test("should track changed cells for Hidden Pairs", () => {
    let cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(new Cell(0, i));
    }
    const group = new Group(cells);
    
    // Setup: cijfers 4 en 7 kunnen alleen in cel 0 en 4
    cells[0].setOptions([1, 4, 7]);
    cells[1].setOptions([2, 5, 8]);
    cells[2].setOptions([1, 2, 6]);
    cells[3].setOptions([3, 8, 9]);
    cells[4].setOptions([1, 4, 7]);
    cells[5].setOptions([2, 5, 8]);
    cells[6].setOptions([]);
    cells[7].setOptions([]);
    cells[8].setOptions([]);
    
    // Clear cellsChanged from any previous operations
    group.cellsChanged = [];
    group.removeHiddenSubGroups();
    
    // Cellen 0 en 4 moeten gewijzigd zijn (1 geëlimineerd)
    expect(group.cellsChanged).toContain(cells[0]);
    expect(group.cellsChanged).toContain(cells[4]);
    expect(group.cellsChanged.length).toBe(2);
  });

  test("should not detect Hidden Pairs when numbers have too many positions", () => {
    let cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(new Cell(0, i));
    }
    const group = new Group(cells);
    
    // Cijfer 4 kan in 3 cellen (0, 2, 4) - geen Hidden Pair mogelijk
    // Cijfer 7 kan in 2 cellen (0, 4) - maar geen match met andere cijfer
    cells[0].setOptions([1, 4, 7]);
    cells[1].setOptions([2, 3, 6]);
    cells[2].setOptions([1, 4, 6]);
    cells[3].setOptions([3, 8, 9]);
    cells[4].setOptions([1, 4, 7]);
    cells[5].setOptions([2, 3, 6]);
    cells[6].setOptions([]);
    cells[7].setOptions([]);
    cells[8].setOptions([]);
    
    const originalOptions = cells.map(cell => [...cell.options]);
    group.cellsChanged = [];
    group.removeHiddenSubGroups();
    
    // Geen wijzigingen - geen Hidden Pairs gevonden
    cells.forEach((cell, i) => {
      expect(cell.options).toEqual(originalOptions[i]);
    });
    expect(group.cellsChanged).toEqual([]);
  });
});
