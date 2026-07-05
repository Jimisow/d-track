// Écran des règles — contenu statique illustré.
import { SYMBOLS } from '../game/symbols.js';
import { $, el } from './dom.js';

export function renderRules() {
  const container = $('#rules-content');
  if (container.childElementCount) return; // déjà rendu

  const sym = (id) => el('span', { style: `color:${SYMBOLS[id].color}` }, SYMBOLS[id].glyph);

  container.append(
    el('h3', {}, '🎯 But du jeu'),
    el('p', {}, 'Remplissez votre grille de 5×5 cases en alignant des symboles identiques pour marquer un maximum de points.'),

    el('h3', {}, '🎲 Les symboles'),
    el('div', { class: 'rules-symbols' },
      SYMBOLS.map((s) => el('span', { style: `color:${s.color}`, title: s.name }, s.glyph))
    ),
    el('p', {}, 'Deux dés à 6 faces portent chacun ces 6 symboles.'),

    el('h3', {}, '▶️ Mise en place'),
    el('p', {}, el('strong', {}, 'Aucun dé ici : '), 'chacun choisit librement UN des 6 symboles — en multijoueur, chacun choisit à son tour (l’hôte en premier) et ne peut pas reprendre un symbole déjà pris par un autre joueur. Ce symbole est automatiquement posé dans la case en haut à gauche de la grille : aucun autre choix de position possible.'),
    el('h3', {}, '▶️ Puis 12 tours'),
    el('p', {}, 'Les 2 dés sont lancés une seule fois pour tout le monde. Chaque forme se pose SÉPARÉMENT, sur n’importe quelle case vide, à condition qu’elle soit adjacente (côte à côte, jamais en diagonale) à une case déjà occupée de votre grille — y compris une case que vous venez tout juste de remplir dans ce même tour. Les 2 formes n’ont pas besoin d’être adjacentes entre elles : votre grille se remplit comme une zone qui grandit depuis le coin haut-gauche. Une fois validé, c’est définitif !'),
    el('p', {}, 'Après la mise en place + 12 tours, la grille est pleine (1 + 12×2 = 25 cases) — un placement légal existe toujours, la zone occupée ne pouvant jamais être totalement enfermée.'),

    el('h3', {}, '🏆 Le score'),
    el('p', {}, 'On évalue 11 zones : les 5 lignes, les 5 colonnes et la diagonale marquée. Dans chaque zone, les séries de symboles identiques côte à côte rapportent :'),
    el('div', { class: 'rules-example' }, sym(1), sym(1), el('span', { style: 'margin-left:auto' }, '2 pts')),
    el('div', { class: 'rules-example' }, sym(2), sym(2), sym(2), el('span', { style: 'margin-left:auto' }, '3 pts')),
    el('div', { class: 'rules-example' }, sym(3), sym(3), sym(3), sym(3), el('span', { style: 'margin-left:auto' }, '8 pts')),
    el('div', { class: 'rules-example' }, sym(4), sym(4), sym(4), sym(4), sym(4), el('span', { style: 'margin-left:auto' }, '10 pts')),
    el('p', {}, 'Plusieurs séries dans la même zone se cumulent (deux paires = 4 pts). Mais attention : une zone sans AUCUNE série = ', el('strong', {}, '−5 points'), ' !'),

    el('h3', {}, '✨ La diagonale ×2'),
    el('p', {}, 'La diagonale marquée (du coin haut-droit au coin bas-gauche, repérée par les flèches) compte ', el('strong', {}, 'double'), ' : une paire y vaut 4 pts… mais aucune série y coûte −10 pts !'),

    el('h3', {}, '👥 Multijoueur'),
    el('p', {}, 'De 2 à 6 joueurs, chacun sur son téléphone, où qu’il soit. Tout le monde reçoit les MÊMES lancers et remplit sa propre grille. Le tour suivant démarre quand tous les joueurs ont validé. Le plus haut score gagne !')
  );
}
