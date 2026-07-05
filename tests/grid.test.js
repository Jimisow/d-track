// Tests de la grille : la zone occupée grandit depuis [0,0], un placement
// n'est valide que s'il est vide ET adjacent (orthogonalement) à une case
// déjà occupée — y compris une case posée à l'instant, plus tôt dans le tour.
import { describe, it, expect } from 'vitest';
import {
  createGrid, neighbors, hasOccupiedNeighbor, validPlacementCells,
  validateGrowthPlacement, placeAt, validateInitialPlacement, placeInitialSymbol,
  isFull, countEmpty, DIAGONAL, CELLS, TOP_LEFT
} from '../src/game/grid.js';
import { generateSharedRolls, rollForTurn, generateCode, isValidCode, CODE_ALPHABET, TURNS } from '../src/game/dice.js';

describe('voisinage orthogonal', () => {
  it('les coins ont 2 voisins, les bords 3, le centre 4', () => {
    expect(neighbors(0).sort((a, b) => a - b)).toEqual([1, 5]);
    expect(neighbors(2).length).toBe(3);
    expect(neighbors(12).length).toBe(4);
  });

  it('ne compte jamais les diagonales comme voisines', () => {
    expect(neighbors(0)).not.toContain(6);
    expect(neighbors(12)).not.toContain(6);
    expect(neighbors(12)).not.toContain(18);
  });

  it('ne fait pas de "wrap" entre la fin d’une ligne et le début de la suivante', () => {
    expect(neighbors(4)).not.toContain(5);
    expect(neighbors(9)).not.toContain(10);
  });
});

describe('placement initial (mise en place) : toujours en case [0,0]', () => {
  it('accepte le placement quand la case de départ est vide', () => {
    expect(validateInitialPlacement(createGrid()).ok).toBe(true);
  });

  it('place le symbole en case 0, sans aucune autre option', () => {
    const grid = placeInitialSymbol(createGrid(), 3);
    expect(grid[TOP_LEFT]).toBe(3);
    expect(countEmpty(grid)).toBe(CELLS - 1);
  });

  it('refuse si la case de départ est déjà occupée', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    expect(validateInitialPlacement(grid).ok).toBe(false);
    expect(() => placeInitialSymbol(grid, 1)).toThrow();
  });

  it('est pur : ne modifie pas la grille passée en argument', () => {
    const grid = createGrid();
    placeInitialSymbol(grid, 2);
    expect(grid[TOP_LEFT]).toBe(null);
  });
});

describe('placement de croissance : vide + adjacent à une case occupée', () => {
  it('aucune case n’est valide tant que rien n’est occupé', () => {
    const grid = createGrid();
    expect(hasOccupiedNeighbor(grid, 1)).toBe(false);
    expect(validPlacementCells(grid)).toEqual([]);
    expect(validateGrowthPlacement(grid, 1).ok).toBe(false);
  });

  it('après le symbole initial en [0,0], seules les cases 1 et 5 sont valides', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    expect(validPlacementCells(grid).sort((a, b) => a - b)).toEqual([1, 5]);
    expect(validateGrowthPlacement(grid, 1).ok).toBe(true);
    expect(validateGrowthPlacement(grid, 5).ok).toBe(true);
  });

  it('refuse une case non adjacente à la zone occupée', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    expect(validateGrowthPlacement(grid, 2).ok).toBe(false); // à 2 cases de distance
    expect(validateGrowthPlacement(grid, 12).ok).toBe(false);
  });

  it('refuse l’adjacence en diagonale', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    expect(validateGrowthPlacement(grid, 6).ok).toBe(false); // (1,1), diagonale de (0,0)
  });

  it('refuse une case déjà occupée', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    expect(validateGrowthPlacement(grid, 0).ok).toBe(false);
  });

  it('cas clé : la 2e forme du tour peut être adjacente UNIQUEMENT à la 1re forme que l’on vient de poser à l’instant', () => {
    const grid = placeInitialSymbol(createGrid(), 0); // case 0 occupée
    // La case 6 (diagonale de 0, mais orthogonale à 1) est invalide au départ...
    expect(validateGrowthPlacement(grid, 6).ok).toBe(false);
    // ... mais si on pose d'abord en case 1 (adjacente à 0, valide), la case 6
    // devient adjacente à 1 et devient valide pour le 2e placement du tour,
    // alors même que 1 n'était pas occupée avant le début de ce tour.
    const afterFirst = placeAt(grid, 1, 2);
    expect(validateGrowthPlacement(afterFirst, 6).ok).toBe(true);
  });

  it('placeAt est pur et lève une erreur sur placement illégal', () => {
    const grid = placeInitialSymbol(createGrid(), 0);
    const next = placeAt(grid, 1, 4);
    expect(grid[1]).toBe(null); // l'originale n'est pas modifiée
    expect(next[1]).toBe(4);
    expect(() => placeAt(grid, 2, 1)).toThrow(); // case 2 pas encore adjacente à une case occupée
  });
});

describe('simulation d’une partie complète (croissance depuis [0,0])', () => {
  it('1 symbole initial + 12 tours de 2 formes remplissent toujours exactement la grille, sans jamais bloquer', () => {
    for (let game = 0; game < 200; game++) {
      const rolls = generateSharedRolls();
      let grid = placeInitialSymbol(createGrid(), 0);

      for (let turn = 1; turn <= TURNS; turn++) {
        const [a, b] = rollForTurn(rolls, turn);

        const valid1 = validPlacementCells(grid);
        expect(valid1.length).toBeGreaterThan(0); // toujours au moins une case valide
        const cell1 = valid1[Math.floor(Math.random() * valid1.length)];
        grid = placeAt(grid, cell1, a);

        const valid2 = validPlacementCells(grid);
        expect(valid2.length).toBeGreaterThan(0);
        const cell2 = valid2[Math.floor(Math.random() * valid2.length)];
        grid = placeAt(grid, cell2, b);
      }

      expect(isFull(grid)).toBe(true);
      expect(countEmpty(grid)).toBe(0);
    }
  });
});

describe('dés et codes de salon', () => {
  it('generateSharedRolls produit 24 symboles valides (12 lancers à plat)', () => {
    const rolls = generateSharedRolls();
    expect(rolls.length).toBe(24);
    expect(rolls.every((s) => Number.isInteger(s) && s >= 0 && s <= 5)).toBe(true);
  });

  it('rollForTurn lit le bon lancer', () => {
    const rolls = generateSharedRolls(() => 0.999); // toujours symbole 5
    expect(rollForTurn(rolls, 1)).toEqual([5, 5]);
    expect(rollForTurn(rolls, 12)).toEqual([5, 5]);
    expect(rollForTurn(rolls, 13)).toBe(null);
    expect(rollForTurn(rolls, 0)).toBe(null);
  });

  it('les codes de salon font 5 caractères sans 0/O/1/I', () => {
    for (const forbidden of ['0', 'O', '1', 'I']) {
      expect(CODE_ALPHABET.includes(forbidden)).toBe(false);
    }
    const code = generateCode();
    expect(code.length).toBe(5);
    expect(isValidCode(code)).toBe(true);
    expect(isValidCode('AB C1')).toBe(false);
    expect(isValidCode('ABC')).toBe(false);
  });

  it('la diagonale marquée relie le coin haut-droit au coin bas-gauche', () => {
    expect(DIAGONAL[0]).toBe(4);   // (0,4)
    expect(DIAGONAL[4]).toBe(20);  // (4,0)
  });
});
