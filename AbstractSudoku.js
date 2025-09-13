const Move = require("./models/Move");
const { intersection } = require("./utils");

const abstractSudoku = (_sudoku, cells, groups) => {
  const setOptions = (logStrategies = false) => {
    // Stap 1: Basis eliminatie (altijd eerst)
    _setOptionsForCells(cells, groups);
    if (logStrategies) {
      console.log("  → Opties berekend op basis van rij/kolom/blok constraints");
    }
    
    // Iteratieve eliminatie: herhaal stap 2 en 3 tot geen wijzigingen meer
    let hasChanges = true;
    let iterationCount = 0;
    
    while (hasChanges && iterationCount < 10) { // Safety limit
      hasChanges = false;
      iterationCount++;
      
      // Stap 2: Naked Pairs/Triples eliminatie
      const beforeSubGroup = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      _removeSubGroupOptions(groups);
      const afterSubGroup = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      if (beforeSubGroup > afterSubGroup) {
        hasChanges = true;
        if (logStrategies) {
          console.log(`  → Naked Pairs/Triples eliminatie toegepast (iteratie ${iterationCount})`);
        }
      }

      // Stap 3: Hidden Pairs/Triples eliminatie
      const beforeHiddenSubGroup = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      _removeHiddenSubGroups(groups);
      const afterHiddenSubGroup = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      if (beforeHiddenSubGroup > afterHiddenSubGroup) {
        hasChanges = true;
        if (logStrategies) {
          console.log(`  → Hidden Pairs/Triples eliminatie toegepast (iteratie ${iterationCount})`);
        }
      }
      
      // Stap 4: Box/Line Reduction eliminatie
      const beforeNumberOptions = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      _removeNumberOptions(groups);
      const afterNumberOptions = cells.map(c => c.options.length).reduce((a,b) => a+b, 0);
      if (beforeNumberOptions > afterNumberOptions) {
        hasChanges = true;
        if (logStrategies) {
          console.log(`  → Box/Line Reduction eliminatie toegepast (iteratie ${iterationCount})`);
        }
      }
    }
    
    if (logStrategies && iterationCount > 1) {
      console.log(`  → Eliminatie convergeerde na ${iterationCount} iteraties`);
    }
  };

  setOptions();

  const getCells = () => cells;
  const getGroups = () => groups;

  const getCell = (row, col) =>
    cells.find((cell) => cell.row === row && cell.col === col);

  const setCell = (row, col, val) => {
    const cell = getCell(row, col);
    cell.setValue(val);
    _sudoku[row][col] = val;
    setOptions();
  };

  const resetCell = (row, col) => {
    const cell = getCell(row, col);
    cell.reset();
    _sudoku[row][col] = 0;
    setOptions();
  };

  const onlyMovesForCell = () =>
    cells
      .filter((cell) => cell.options.length === 1)
      .map((cell) => new Move(cell, cell.options[0]));

  const validate = () => groups.every((group) => group.validate());

  const isValid = () => groups.every((group) => group.isValid());

  const isFeasible = () =>
    cells.every((cell) => cell.value || cell.options.length);

  const findMove = () => {
    let moves = onlyMovesForCell();
    if (moves.length > 0) {
      moves[0].strategy = "Naked Single (cel heeft slechts 1 optie)";
      return moves[0];
    }
    for (let group of groups) {
      moves = group.onlyMoves();
      if (moves.length > 0) {
        moves[0].strategy = `Hidden Single (cijfer kan maar op 1 plek in ${moves[0].groupInfo})`;
        return moves[0];
      }
    }
    return null;
  };

  const playMove = (move) => {
    const {
      cell: { row, col },
      value,
    } = move;
    setCell(row, col, value);
  };

  const solve = () => {
    let moveNumber = 0;
    let trialMoveNumber = [];
    let moveList = [];
    let movesToTry = new Map();
    let lastTrialMove = null; // Track de laatste trial move
    let validated = validate();
    while (!validated) {
      moveNumber++;
      console.log(`\nZet ${moveNumber}:`);
      setOptions(true); // Log strategieën tijdens het zoeken
      
      let move = findMove();

      if (!isFeasible()) {
        console.log("  → Puzzle niet oplosbaar met huidige zetten, backtracking...");
        if (lastTrialMove) {
          console.log(`    Foutieve trial move was: [${lastTrialMove.cell.row + 1}, ${lastTrialMove.cell.col + 1}] = ${lastTrialMove.value}`);
        }
        let movesAvailable = false;
        while (!movesAvailable) {
          moveNumber = trialMoveNumber.pop();
          movesAvailable = movesToTry.get(moveNumber).length > 0;
        }
        resetMoves = moveList.splice(moveNumber - 1);
        resetMoves.forEach((move) => move.cell.reset());
        setOptions();
        move = movesToTry.get(moveNumber).shift();
        move.strategy = lastTrialMove ? 
          `Backtracking (na foutieve trial move [${lastTrialMove.cell.row + 1}, ${lastTrialMove.cell.col + 1}] = ${lastTrialMove.value})` :
          "Backtracking (terugkeren na foutieve trial move)";
        lastTrialMove = move; // Update voor volgende iteratie
      }

      if (!move) {
        console.log("  → Geen logische zetten meer mogelijk, start backtracking");
        movesToTry.set(moveNumber, _trialMoves(cells));
        move = movesToTry.get(moveNumber).shift();
        move.strategy = "Backtracking (trial and error - logische methoden uitgeput)";
        trialMoveNumber.push(moveNumber);
        lastTrialMove = move; // Track deze trial move
      }

      console.log(`  ✓ ${move.strategy}`);
      console.log(`    Zet: [${move.cell.row + 1}, ${move.cell.col + 1}] = ${move.value}`);
      
      moveList.push(move);
      playMove(move);
      validated = validate();
    }
    console.log(_sudoku);
    _printMoves(moveList);
    return _sudoku;
  };

  const sudoku = {
    get: () => _sudoku,
    getCells,
    getCell,
    setCell,
    resetCell,
    getGroups,
    onlyMovesForCell,
    findMove,
    playMove,
    solve,
    validate,
    isValid,
    isFeasible,

    printOptions: () => {
      console.log(
        cells
          .filter((cell) => cell.options.length)
          .map((cell) => `[${cell.row}, ${cell.col}]: ${cell.options}`)
      );
    },
  };
  return sudoku;
};

const _setOptionsForCells = (cells, groups) => {
  cells.forEach((cell) => {
    cell.setOptions(
      groups
        .filter((group) => group.hasCell(cell))
        .reduce(
          (a, b) => {
            return intersection(a, b.remainingValues());
          },
          [1, 2, 3, 4, 5, 6, 7, 8, 9]
        )
    );
  });
};

const _removeSubGroupOptions = (groups) => {
  let hasChangedCells = true;
  while (hasChangedCells) {
    groups.forEach((group) => {
      group.removeSubGroupOptions();
    });
    hasChangedCells = groups.some((group) => group.cellsChanged.length > 0);
  }
};

const _removeHiddenSubGroups = (groups) => {
  let hasChangedCells = true;
  while (hasChangedCells) {
    groups.forEach((group) => {
      group.removeHiddenSubGroups();
    });
    hasChangedCells = groups.some((group) => group.cellsChanged.length > 0);
  }
};

const _removeNumberOptions = (groups) => {
  for (let n = 1; n < 10; n++) {
    for (let group of groups) {
      const cellsForNumber = group
        .possibleMoves()
        .filter((move) => move.value === n)
        .map((move) => move.cell);
      for (let otherGroup of groups) {
        if (cellsForNumber.every((cell) => otherGroup.hasCell(cell))) {
          // remove number from other cells;
          const otherCells = group.cells.filter(
            (cell) => !cellsForNumber.includes(cell)
          );
          otherGroup.removeOption(otherCells, n);
        }
      }
    }
  }
};

const _trialMoves = (cells) => {
  const numberOfOptionsPerCell = cells
    .map((cell) => cell.options.length)
    .filter((length) => length > 0);
  const minOptions = Math.min(...numberOfOptionsPerCell);
  const cell = cells.find((cell) => cell.options.length === minOptions);
  return cell.options.map((option) => new Move(cell, option));
};

const _printMoves = (movelist) => {
  console.log('\n=== ZETTEN MET STRATEGIEËN ===');
  movelist.forEach((move, index) => {
    console.log(`${index + 1}. [${move.cell.row + 1}, ${move.cell.col + 1}]: ${move.value} - ${move.strategy || 'Onbekende strategie'}`);
  });
  console.log('===============================\n');
};

module.exports = abstractSudoku;
