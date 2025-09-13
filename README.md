# Sudoku Solver

Een geavanceerde Sudoku solver geïmplementeerd in JavaScript met uitgebreide logging en debugging mogelijkheden.

## Features

- **Intelligente eliminatie strategieën:**
  - Basis eliminatie (rij/kolom/blok constraints)
  - Naked Pairs/Triples/Quads detectie
  - Box/Line Reduction eliminatie
  - Iteratieve eliminatie tot convergentie

- **Uitgebreide logging:**
  - Strategie identificatie per zet (Naked Single, Hidden Single, Backtracking)
  - Groep identificatie voor Hidden Singles
  - Iteratie tracking voor eliminatie stappen
  - Backtracking transparantie

- **Debugging tools:**
  - Cell options inspection
  - Move strategy classification
  - Elimination step tracking

## Bestanden

- `sudoku.js` - Hoofdfunctie voor sudoku initialisatie
- `AbstractSudoku.js` - Core solving logic en algoritmen
- `models/Group.js` - Groep (rij/kolom/blok) logica en subgroup detectie
- `models/Move.js` - Move representatie
- `models/Cell.js` - Cell state management
- `utils.js` - Utility functies voor array/set operaties
- `solve.js` - Test script voor debugging
- `hard.txt` - Voorbeeld puzzle

## Gebruik

```javascript
const sudoku = require('./sudoku');

// Laad puzzle uit array of bestand
const puzzle = sudoku(inputArray);

// Los op met logging
const solution = puzzle.solve();
```

## Algoritme

Het algoritme gebruikt een drie-staps eliminatie proces:

1. **Basis eliminatie**: Elimineer opties gebaseerd op geplaatste waarden in rij/kolom/blok
2. **Naked Pairs/Triples**: Detecteer en elimineer subgroepen met identieke opties
3. **Box/Line Reduction**: Cross-eliminatie tussen verschillende groeptypes

Deze stappen worden iteratief herhaald tot convergentie, gevolgd door backtracking indien nodig.

## Ontwikkeling

Dit project is ontwikkeld met focus op:
- Transparantie in het solving proces
- Uitgebreide debugging mogelijkheden
- Optimale eliminatie strategieën
- Clean, leesbare code architectuur
