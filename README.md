# Sudoku Solver

Een geavanceerde Sudoku solver geïmplementeerd in JavaScript met uitgebreide logging en debugging mogelijkheden.

## Features

- **Intelligente eliminatie strategieën:**
  - Basis eliminatie (rij/kolom/blok constraints)
  - Naked Pairs/Triples/Quads detectie
  - Hidden Pairs/Triples/Quads detectie
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

Het algoritme gebruikt een vier-staps eliminatie proces:

1. **Basis eliminatie**: Elimineer opties gebaseerd op geplaatste waarden in rij/kolom/blok
2. **Naked Pairs/Triples**: Detecteer en elimineer subgroepen met identieke opties
3. **Hidden Pairs/Triples**: Detecteer cijfers die alleen in dezelfde cellen kunnen voorkomen
4. **Box/Line Reduction**: Cross-eliminatie tussen verschillende groeptypes

Deze stappen worden iteratief herhaald tot convergentie, gevolgd door backtracking indien nodig.

### Eliminatie Strategieën

#### Naked Pairs/Triples
```
Cel A: [3, 7]    ← Identieke opties
Cel B: [3, 7]    ← Identieke opties
→ Elimineer 3 en 7 uit alle andere cellen in de groep
```

#### Hidden Pairs/Triples
```
Cijfer 4: kan alleen in cel A en B
Cijfer 7: kan alleen in cel A en B  ← Zelfde posities!
→ Elimineer alle andere opties uit cel A en B
```

#### Box/Line Reduction
```
Als cijfer 5 in blok 1 alleen in rij 1 kan voorkomen
→ Elimineer 5 uit de rest van rij 1 (buiten blok 1)
```

## Test-Driven Development

Dit project is volledig ontwikkeld met TDD (Test-Driven Development):
- **18 unit tests** voor alle core functionaliteit
- **Comprehensive test coverage** voor Hidden Pairs/Triples eliminatie
- **Jest test framework** voor reliable testing
- **Continuous testing** tijdens ontwikkeling

```bash
# Run alle tests
npm test

# Run specifieke test file
npm test -- models/Group.test.js
```

## Ontwikkeling

Dit project is ontwikkeld met focus op:
- **Test-Driven Development** methodologie
- Transparantie in het solving proces
- Uitgebreide debugging mogelijkheden
- Optimale eliminatie strategieën
- Clean, leesbare code architectuur
