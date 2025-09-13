const Move = require("./Move");
const { findEquivalentArraysInObjects } = require("../utils");

class Group {
  cellsChanged = [];

  constructor(cells, requiredValues = [1, 2, 3, 4, 5, 6, 7, 8, 9], type = 'unknown', index = 0) {
    this.cells = cells;
    this.requiredValues = requiredValues;
    this.type = type; // 'row', 'col', 'block'
    this.index = index; // welke rij/kolom/blok (0-8)
  }

  hasCell(cell) {
    return this.cells.includes(cell);
  }

  values() {
    return this.cells.map((cell) => cell.value);
  }

  isValid() {
    if (!this.cells.every((cell) => cell.isValid)) return false;
    return this.requiredValues.every(
      (value) => this.values().filter((val) => val === value).length <= 1
    );
  }

  validate() {
    return this.requiredValues.every(
      (value) => this.values().filter((val) => val === value).length === 1
    );
  }

  remainingValues() {
    return this.requiredValues.filter(
      (value) => !this.values().includes(value)
    );
  }

  possibleMoves() {
    let moves = [];
    this.cells.forEach((cell) => {
      cell.options.forEach((option) => {
        moves.push(new Move(cell, option));
      });
    });
    return moves;
  }

  onlyMoves() {
    let moves = [];
    this.remainingValues().forEach((value) => {
      const movesForValue = this.possibleMoves().filter(
        (move) => move.value === value
      );
      if (movesForValue.length === 1) {
        const move = movesForValue[0];
        move.groupInfo = this.getGroupDescription();
        moves.push(move);
      }
    });
    return moves;
  }

  getGroupDescription() {
    switch (this.type) {
      case 'row':
        return `rij ${this.index + 1}`;
      case 'col':
        return `kolom ${this.index + 1}`;
      case 'block':
        const blockRow = Math.floor(this.index / 3) + 1;
        const blockCol = (this.index % 3) + 1;
        return `blok ${blockRow},${blockCol}`;
      default:
        return 'onbekende groep';
    }
  }

  findSubGroups() {
    const cellsWithOptions = this.cells.filter(
      (cell) => cell.options.length > 0
    );
    return findEquivalentArraysInObjects(cellsWithOptions, "options").filter(
      (subGroup) => subGroup.length === subGroup[0].options.length
    );
  }

  removeSubGroupOptions() {
    // Naked Pairs/Triples eliminatie
    const subGroupsCells = this.findSubGroups().flat();
    const subGroupOptions = subGroupsCells.reduce(
      (options, cell) => options.concat(cell.options),
      []
    );
    this.cellsChanged = [];
    this.cells
      .filter((cell) => !subGroupsCells.includes(cell))
      .forEach((cell) => {
        const newCellOptions = cell.options.filter(
          (option) => !subGroupOptions.includes(option)
        );
        if (newCellOptions.length < cell.options.length) {
          this.cellsChanged.push(cell);
        }
        cell.setOptions(newCellOptions);
      });
  }

  removeHiddenSubGroups() {
    const remainingValues = this.remainingValues();
    this.cellsChanged = [];
    
    // Groepeer cijfers per aantal mogelijke posities
    const valuePositions = new Map();
    remainingValues.forEach(value => {
      const possibleCells = this.cells.filter(cell => 
        cell.options.includes(value)
      );
      if (possibleCells.length >= 2 && possibleCells.length <= 4) {
        const key = possibleCells.map(c => `${c.row},${c.col}`).sort().join('|');
        if (!valuePositions.has(key)) {
          valuePositions.set(key, { cells: possibleCells, values: [] });
        }
        valuePositions.get(key).values.push(value);
      }
    });

    // Zoek Hidden Pairs/Triples: aantal cijfers = aantal cellen
    valuePositions.forEach(({ cells, values }) => {
      if (values.length === cells.length && values.length >= 2) {
        // Hidden subgroup gevonden! Elimineer andere opties uit deze cellen
        cells.forEach(cell => {
          const newOptions = cell.options.filter(option => values.includes(option));
          if (newOptions.length < cell.options.length) {
            this.cellsChanged.push(cell);
            cell.setOptions(newOptions);
          }
        });
      }
    });
  }

  removeOption(cells, value) {
    cells.forEach((cell) => {
      cell.removeOption(value);
    });
  }
}

module.exports = Group;
