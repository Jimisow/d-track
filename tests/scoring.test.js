// Tests du scoring — barème : série de 2 → 2 pts, 3 → 3, 4 → 8, 5 → 10,
// cumul des séries, malus −5 par zone sans série, diagonale ×2.
import { describe, it, expect } from 'vitest';
import { findRuns, scoreZone, scoreGrid, rankPlayers, getZones, zoneKey, zonesContainingCell } from '../src/game/scoring.js';
import { DIAGONAL, CELLS } from '../src/game/grid.js';

// Construit une grille pleine "sans aucune série nulle part" est impossible à
// éviter à la main : on construit plutôt des grilles contrôlées case par case.
function gridFrom(rows) {
  // rows : tableau de 5 tableaux de 5 valeurs (index symbole ou null)
  return rows.flat();
}

describe('findRuns — détection des séries consécutives', () => {
  it('détecte une paire', () => {
    expect(findRuns([0, 0, 1, 2, 3])).toEqual([{ start: 0, length: 2, symbol: 0 }]);
  });

  it('détecte un brelan au milieu', () => {
    expect(findRuns([1, 4, 4, 4, 2])).toEqual([{ start: 1, length: 3, symbol: 4 }]);
  });

  it('détecte deux séries distinctes dans la même zone', () => {
    expect(findRuns([0, 0, 1, 2, 2])).toEqual([
      { start: 0, length: 2, symbol: 0 },
      { start: 3, length: 2, symbol: 2 }
    ]);
  });

  it('ne compte pas les symboles identiques séparés (non consécutifs)', () => {
    expect(findRuns([0, 1, 0, 1, 0])).toEqual([]);
  });

  it('les cases vides cassent les séries et ne forment jamais de série', () => {
    expect(findRuns([0, null, 0, null, null])).toEqual([]);
    expect(findRuns([null, 3, 3, null, 3])).toEqual([{ start: 1, length: 2, symbol: 3 }]);
  });
});

describe('scoreZone — barème par zone', () => {
  it('paire = 2 points', () => {
    expect(scoreZone([0, 0, 1, 2, 3]).points).toBe(2);
  });

  it('brelan (3) = 3 points', () => {
    expect(scoreZone([5, 5, 5, 1, 2]).points).toBe(3);
  });

  it('carré (4) = 8 points', () => {
    expect(scoreZone([2, 2, 2, 2, 0]).points).toBe(8);
  });

  it('quinte (5) = 10 points', () => {
    expect(scoreZone([3, 3, 3, 3, 3]).points).toBe(10);
  });

  it('séries multiples cumulées : deux paires = 4 points', () => {
    expect(scoreZone([0, 0, 1, 2, 2]).points).toBe(4);
  });

  it('paire + brelan = 5 points', () => {
    expect(scoreZone([0, 0, 4, 4, 4]).points).toBe(5);
  });

  it('zone complète sans série = malus de −5', () => {
    expect(scoreZone([0, 1, 2, 3, 4]).points).toBe(-5);
    expect(scoreZone([0, 1, 0, 1, 0]).points).toBe(-5);
  });

  it('zone incomplète sans série = 0 (pas de malus avant la fin)', () => {
    const z = scoreZone([0, 1, null, null, null]);
    expect(z.points).toBe(0);
    expect(z.complete).toBe(false);
  });

  it('décompte FINAL : le malus s’applique aussi aux zones incomplètes sans série (repli)', () => {
    expect(scoreZone([0, 1, null, 2, 3], { finalScoring: true }).points).toBe(-5);
    expect(scoreZone([0, 0, null, 2, 3], { finalScoring: true }).points).toBe(2); // une série → pas de malus
  });
});

describe('scoreGrid — diagonale doublée (haut-droit → bas-gauche)', () => {
  it('la diagonale est bien composée des cases 4, 8, 12, 16, 20', () => {
    const diag = getZones().find((z) => z.type === 'diag');
    expect(diag.cells).toEqual([4, 8, 12, 16, 20]);
    expect(DIAGONAL).toEqual([4, 8, 12, 16, 20]);
  });

  it('une paire sur la diagonale = 2 × 2 = 4 points', () => {
    const grid = Array(CELLS).fill(null);
    grid[4] = 1;
    grid[8] = 1; // paire consécutive sur la diagonale
    grid[12] = 2;
    grid[16] = 3;
    grid[20] = 4;
    const diag = scoreGrid(grid).zones.find((z) => z.type === 'diag');
    expect(diag.basePoints).toBe(2);
    expect(diag.multiplier).toBe(2);
    expect(diag.points).toBe(4);
  });

  it('diagonale complète sans série = −5 × 2 = −10 points', () => {
    const grid = Array(CELLS).fill(null);
    [4, 8, 12, 16, 20].forEach((cell, k) => { grid[cell] = k; }); // 5 symboles différents
    const diag = scoreGrid(grid).zones.find((z) => z.type === 'diag');
    expect(diag.points).toBe(-10);
  });

  it('quinte sur la diagonale = 10 × 2 = 20 points', () => {
    const grid = Array(CELLS).fill(null);
    [4, 8, 12, 16, 20].forEach((cell) => { grid[cell] = 5; });
    const diag = scoreGrid(grid).zones.find((z) => z.type === 'diag');
    expect(diag.points).toBe(20);
  });
});

describe('scoreGrid — total sur grille complète', () => {
  it('grille uniforme : 5 lignes ×10 + 5 colonnes ×10 + diagonale 10×2 = 120', () => {
    const grid = Array(CELLS).fill(0);
    expect(scoreGrid(grid).total).toBe(100 + 20);
  });

  it('grille complète calculée zone par zone à la main', () => {
    // Grille (symboles 0–5), diagonale marquée = (0,4),(1,3),(2,2),(3,1),(4,0) :
    const grid = gridFrom([
      [0, 0, 1, 2, 2],   // ligne 1 : paire + paire        = 4
      [3, 3, 3, 2, 4],   // ligne 2 : brelan               = 3
      [5, 1, 2, 2, 4],   // ligne 3 : paire                = 2
      [5, 1, 0, 3, 4],   // ligne 4 : aucune série         = −5
      [2, 1, 0, 3, 3]    // ligne 5 : paire                = 2
    ]);
    // Colonne 1 : [0,3,5,5,2]  → paire (5,5)              = 2
    // Colonne 2 : [0,3,1,1,1]  → brelan (1,1,1)           = 3
    // Colonne 3 : [1,3,2,0,0]  → paire (0,0)              = 2
    // Colonne 4 : [2,2,2,3,3]  → brelan + paire           = 5
    // Colonne 5 : [2,4,4,4,3]  → brelan                   = 3
    // Diagonale [4,8,12,16,20] = [2,2,2,1,2] → brelan = 3 × 2 = 6
    const result = scoreGrid(grid);
    const byLabel = Object.fromEntries(result.zones.map((z) => [z.label, z.points]));
    expect(byLabel['Ligne 1']).toBe(4);
    expect(byLabel['Ligne 2']).toBe(3);
    expect(byLabel['Ligne 3']).toBe(2);
    expect(byLabel['Ligne 4']).toBe(-5);
    expect(byLabel['Ligne 5']).toBe(2);
    expect(byLabel['Colonne 1']).toBe(2);
    expect(byLabel['Colonne 2']).toBe(3);
    expect(byLabel['Colonne 3']).toBe(2);
    expect(byLabel['Colonne 4']).toBe(5);
    expect(byLabel['Colonne 5']).toBe(3);
    expect(byLabel['Diagonale ×2']).toBe(6);
    expect(result.total).toBe(4 + 3 + 2 - 5 + 2 + 2 + 3 + 2 + 5 + 3 + 6);
  });
});

describe('zoneKey / zonesContainingCell — pour le feedback de score en temps réel', () => {
  it('zoneKey attribue une clé unique à chacune des 11 zones', () => {
    const keys = getZones().map(zoneKey);
    expect(new Set(keys).size).toBe(11);
  });

  it('une case sur la diagonale appartient à sa ligne, sa colonne ET la diagonale', () => {
    const zones = zonesContainingCell(4); // coin haut-droit, sur la diagonale marquée
    expect(zones.map((z) => z.type).sort()).toEqual(['col', 'diag', 'row']);
  });

  it('une case hors diagonale n’appartient qu’à sa ligne et sa colonne', () => {
    const zones = zonesContainingCell(0); // coin haut-gauche, pas sur la diagonale marquée
    expect(zones.map((z) => z.type).sort()).toEqual(['col', 'row']);
  });
});

describe('rankPlayers — classement et ex æquo', () => {
  it('trie du meilleur au moins bon', () => {
    const ranked = rankPlayers([
      { uid: 'a', score: 10 },
      { uid: 'b', score: 30 },
      { uid: 'c', score: 20 }
    ]);
    expect(ranked.map((r) => r.uid)).toEqual(['b', 'c', 'a']);
    expect(ranked.map((r) => r.rank)).toEqual([1, 2, 3]);
  });

  it('les ex æquo partagent le même rang, le suivant saute un rang', () => {
    const ranked = rankPlayers([
      { uid: 'a', score: 20 },
      { uid: 'b', score: 20 },
      { uid: 'c', score: 5 }
    ]);
    expect(ranked[0].rank).toBe(1);
    expect(ranked[1].rank).toBe(1);
    expect(ranked[2].rank).toBe(3);
  });
});
