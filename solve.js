const sudoku = require('./sudoku');

// Functie om een Sudoku puzzle op te lossen
function solvePuzzle(input) {
  console.log('=== Sudoku Solver ===\n');
  
  try {
    const puzzle = sudoku(input);
    
    const solution = puzzle.solve();
    
    if (solution) {
      console.log('Opgelost!');
    } else {
      console.log('Geen oplossing gevonden voor deze puzzle.');
    }
  } catch (error) {
    console.error('Fout bij het oplossen:', error.message);
  }
}

// Voorbeelden van gebruik:

// 1. Los een puzzle op uit een bestand
console.log('1. Hard puzzle uit bestand:');
solvePuzzle('./hardXL.txt');

