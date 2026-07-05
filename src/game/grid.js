// Logique pure de la grille 5×5. Aucune dépendance DOM — testable avec Vitest.
// Une grille est un tableau de 25 entrées : null (vide) ou index de symbole (0–5).
// L'index d'une case = ligne * 5 + colonne.
//
// Règle de remplissage : la grille se construit comme une zone connexe qui
// grandit depuis la case [0,0] (toujours occupée en premier, sans dé). Chaque
// case posée ensuite doit être vide ET orthogonalement adjacente à une case
// déjà occupée — jamais en diagonale. Cette zone occupée reste toujours
// connexe et, tant qu'elle ne couvre pas toute la grille, possède forcément
// au moins une case vide adjacente (propriété des sous-graphes connexes
// propres d'un graphe connexe) : un placement légal existe donc toujours.

export const SIZE = 5;
export const CELLS = SIZE * SIZE;
export const TOP_LEFT = 0; // case de départ du symbole initial

// Diagonale marquée : du coin haut-DROIT (0,4) au coin bas-GAUCHE (4,0).
// Ses points comptent double.
export const DIAGONAL = [4, 8, 12, 16, 20];

export function createGrid() {
  return Array(CELLS).fill(null);
}

export const rowOf = (i) => Math.floor(i / SIZE);
export const colOf = (i) => i % SIZE;

export function isValidIndex(i) {
  return Number.isInteger(i) && i >= 0 && i < CELLS;
}

export function isEmpty(grid, i) {
  return isValidIndex(i) && (grid[i] === null || grid[i] === undefined || grid[i] === -1);
}

// Voisins orthogonaux d'une case (jamais en diagonale).
export function neighbors(i) {
  const out = [];
  const r = rowOf(i), c = colOf(i);
  if (r > 0) out.push(i - SIZE);
  if (r < SIZE - 1) out.push(i + SIZE);
  if (c > 0) out.push(i - 1);
  if (c < SIZE - 1) out.push(i + 1);
  return out;
}

// Une case a-t-elle au moins un voisin orthogonal déjà occupé ?
export function hasOccupiedNeighbor(grid, i) {
  return neighbors(i).some((n) => !isEmpty(grid, n));
}

// Toutes les cases vides actuellement valides pour un placement de croissance
// (vides ET adjacentes à la zone occupée) — sert à la fois à la validation et
// au surlignage dans l'interface.
export function validPlacementCells(grid) {
  const out = [];
  for (let i = 0; i < CELLS; i++) {
    if (isEmpty(grid, i) && hasOccupiedNeighbor(grid, i)) out.push(i);
  }
  return out;
}

// Validation défensive d'un placement de croissance : on ne fait JAMAIS
// confiance à l'UI. `grid` doit refléter l'état AU MOMENT du placement,
// y compris les formes déjà posées plus tôt dans le même tour.
export function validateGrowthPlacement(grid, i) {
  if (!isValidIndex(i)) return { ok: false, error: 'Case hors de la grille.' };
  if (!isEmpty(grid, i)) return { ok: false, error: 'La case doit être vide.' };
  if (!hasOccupiedNeighbor(grid, i)) {
    return { ok: false, error: 'La case doit être adjacente à une case déjà occupée.' };
  }
  return { ok: true };
}

// Placement PUR : retourne une nouvelle grille, l'originale n'est pas modifiée.
export function placeAt(grid, i, symbol) {
  const v = validateGrowthPlacement(grid, i);
  if (!v.ok) throw new Error(v.error);
  const next = grid.slice();
  next[i] = symbol;
  return next;
}

// Placement du symbole initial (mise en place) : toujours en case [0,0],
// sans aucune condition d'adjacence — c'est la graine de la zone occupée.
export function validateInitialPlacement(grid) {
  if (!isEmpty(grid, TOP_LEFT)) return { ok: false, error: 'La case de départ est déjà occupée.' };
  return { ok: true };
}

export function placeInitialSymbol(grid, symbol) {
  const v = validateInitialPlacement(grid);
  if (!v.ok) throw new Error(v.error);
  const next = grid.slice();
  next[TOP_LEFT] = symbol;
  return next;
}

export function isFull(grid) {
  return grid.every((c) => c !== null && c !== undefined && c !== -1);
}

export function countEmpty(grid) {
  return grid.reduce((n, c) => n + (c === null || c === undefined || c === -1 ? 1 : 0), 0);
}
