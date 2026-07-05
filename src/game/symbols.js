// Les 6 symboles des faces de dés. L'index (0–5) est la valeur stockée
// partout (grilles, lancers Firestore) ; glyph/couleur ne servent qu'à l'UI.
export const SYMBOLS = [
  { id: 0, glyph: '✕', name: 'Croix',    color: '#ef4444' }, // rouge
  { id: 1, glyph: '●', name: 'Rond',     color: '#3b82f6' }, // bleu
  { id: 2, glyph: '▲', name: 'Triangle', color: '#22c55e' }, // vert
  { id: 3, glyph: '■', name: 'Carré',    color: '#f97316' }, // orange
  { id: 4, glyph: '◆', name: 'Losange',  color: '#a855f7' }, // violet
  { id: 5, glyph: '✱', name: 'Étoile',   color: '#14b8a6' }  // turquoise
];
