// Composants d'affichage réutilisables : symboles, mini-grilles, détail du score.
import { SYMBOLS } from '../game/symbols.js';
import { scoreGrid } from '../game/scoring.js';
import { el } from './dom.js';

export function symbolSpan(symbolId) {
  const s = SYMBOLS[symbolId];
  if (!s) return el('span');
  return el('span', { style: `color:${s.color}`, 'aria-label': s.name }, s.glyph);
}

// Miniature 5×5 (écran de résultats multijoueur).
export function miniGrid(grid) {
  const wrap = el('span', { class: 'mini-grid', 'aria-hidden': 'true' });
  for (const cell of grid) {
    const dot = el('i');
    const s = SYMBOLS[cell];
    if (s) dot.style.background = s.color;
    wrap.append(dot);
  }
  return wrap;
}

// Détail du score zone par zone : 11 lignes (5 lignes, 5 colonnes, diagonale ×2),
// cases appartenant à une série surlignées en couleur.
export function zoneBreakdown(grid) {
  const result = scoreGrid(grid, { finalScoring: true });
  const table = el('div', { class: 'zone-table' });

  for (const zone of result.zones) {
    // Positions (0–4 dans la zone) appartenant à une série.
    const inRun = new Set();
    for (const run of zone.runs) {
      for (let k = run.start; k < run.start + run.length; k++) inRun.add(k);
    }

    const cells = el('div', { class: 'zone-cells' },
      zone.cells.map((cellIndex, pos) => {
        const s = SYMBOLS[grid[cellIndex]];
        return el('b', {
          class: inRun.has(pos) ? 'in-run' : '',
          style: s ? `color:${s.color}` : ''
        }, s ? s.glyph : '·');
      })
    );

    const pts = zone.points;
    table.append(el('div', { class: 'zone-row' },
      el('span', { class: 'zone-label' }, zone.label),
      cells,
      el('span', { class: `zone-pts ${pts > 0 ? 'pos' : pts < 0 ? 'neg' : ''}` },
        `${pts > 0 ? '+' : ''}${pts}`)
    ));
  }

  table.append(el('div', { class: 'total-row' },
    el('span', {}, 'Total'),
    el('span', {}, `${result.total} pts`)
  ));
  return table;
}

// Grille statique en lecture seule (visionneuse des grilles adverses).
export function staticGrid(grid) {
  const wrap = el('div', { class: 'grid', style: 'margin-bottom:12px' });
  const diag = new Set([4, 8, 12, 16, 20]);
  grid.forEach((cell, i) => {
    const s = SYMBOLS[cell];
    wrap.append(el('div', { class: `cell filled ${diag.has(i) ? 'diag' : ''}`, style: s ? `color:${s.color}` : '' },
      s ? s.glyph : ''));
  });
  return wrap;
}
