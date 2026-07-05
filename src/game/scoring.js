// Calcul du score — fonctions pures, testées dans tests/scoring.test.js.
//
// 11 zones : 5 lignes + 5 colonnes + 1 diagonale (haut-droit → bas-gauche).
// Dans chaque zone, on cherche les séries de symboles IDENTIQUES CONSÉCUTIFS :
//   série de 2 → 2 pts, 3 → 3 pts, 4 → 8 pts, 5 → 10 pts (cumulables).
// Zone complète sans aucune série → malus de −5 pts.
// Diagonale : résultat (positif OU négatif) multiplié par 2.

import { SIZE, DIAGONAL } from './grid.js';

export const RUN_POINTS = { 2: 2, 3: 3, 4: 8, 5: 10 };

const filled = (c) => c !== null && c !== undefined && c !== -1;

// Séries maximales de symboles identiques consécutifs dans une zone de 5 cases.
// Les cases vides cassent les séries et ne forment jamais de série entre elles.
export function findRuns(cells) {
  const runs = [];
  let i = 0;
  while (i < cells.length) {
    if (!filled(cells[i])) { i++; continue; }
    let j = i + 1;
    while (j < cells.length && cells[j] === cells[i]) j++;
    if (j - i >= 2) runs.push({ start: i, length: j - i, symbol: cells[i] });
    i = j;
  }
  return runs;
}

// Score d'une zone (avant multiplicateur).
// En cours de partie (finalScoring = false), une zone inachevée sans série vaut
// simplement 0 — utile pour l'affichage du score en temps réel.
// En fin de partie (finalScoring = true), le malus de −5 s'applique à TOUTE zone
// sans série, même incomplète (cas rare du repli « un seul symbole » quand plus
// aucune paire de cases adjacentes n'existe).
export function scoreZone(cells, { finalScoring = false } = {}) {
  const runs = findRuns(cells);
  const complete = cells.every(filled);
  let points = runs.reduce((sum, r) => sum + RUN_POINTS[r.length], 0);
  if (runs.length === 0 && (complete || finalScoring)) points = -5;
  return { points, runs, complete };
}

// Les 11 zones avec leurs index de cases dans la grille.
export function getZones() {
  const zones = [];
  for (let r = 0; r < SIZE; r++) {
    zones.push({ type: 'row', index: r, label: `Ligne ${r + 1}`, cells: Array.from({ length: SIZE }, (_, c) => r * SIZE + c) });
  }
  for (let c = 0; c < SIZE; c++) {
    zones.push({ type: 'col', index: c, label: `Colonne ${c + 1}`, cells: Array.from({ length: SIZE }, (_, r) => r * SIZE + c) });
  }
  zones.push({ type: 'diag', index: 0, label: 'Diagonale ×2', cells: DIAGONAL.slice() });
  return zones;
}

// Identifiant stable d'une zone — sert à suivre quelles zones ont déjà été
// comptées lors du feedback de score en temps réel (chaque zone n'est
// scorée qu'une seule fois, au moment précis où sa dernière case se remplit).
export function zoneKey(zone) {
  return `${zone.type}-${zone.index}`;
}

// Les zones (ligne, colonne, et diagonale si applicable) contenant une case
// donnée — utilisé pour ne vérifier que les zones concernées après un
// placement, plutôt que de rescanner toute la grille.
export function zonesContainingCell(cellIndex) {
  return getZones().filter((zone) => zone.cells.includes(cellIndex));
}

// Score complet d'une grille. Retourne le détail zone par zone (pour l'écran
// de fin) et le total. Fonctionne aussi sur une grille partielle (score "live") ;
// passer { finalScoring: true } pour le décompte définitif.
export function scoreGrid(grid, options = {}) {
  const zones = getZones().map((zone) => {
    const cells = zone.cells.map((i) => grid[i]);
    const { points, runs, complete } = scoreZone(cells, options);
    const multiplier = zone.type === 'diag' ? 2 : 1;
    return { ...zone, runs, complete, basePoints: points, multiplier, points: points * multiplier };
  });
  return { zones, total: zones.reduce((sum, z) => sum + z.points, 0) };
}

// Classement avec gestion des ex æquo : deux scores égaux partagent le même rang.
// [{uid, score}] → [{uid, score, rank}] trié du meilleur au moins bon.
export function rankPlayers(entries) {
  const sorted = entries.slice().sort((a, b) => b.score - a.score);
  let rank = 0, prevScore = null;
  return sorted.map((e, i) => {
    if (e.score !== prevScore) { rank = i + 1; prevScore = e.score; }
    return { ...e, rank };
  });
}
