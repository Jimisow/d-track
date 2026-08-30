// Point d'entrée PARESSEUX du compte KUMP.
//
// C'est le seul fichier que le reste du jeu importe statiquement pour parler
// au compte. Il ne charge lui-même que `kumpConfig.js` (des constantes
// d'environnement), et n'atteint `kump.js` — donc le SDK Firebase — qu'au
// moment où une partie se termine réellement.
//
// Conséquence voulue : quelqu'un qui lance D-Track et joue une partie solo
// hors ligne ne télécharge jamais Firebase tant qu'il n'a pas fini sa partie,
// et le mode solo reste jouable même si ce chargement échoue.

import { isKumpConfigured } from './kumpConfig.js';

/**
 * Enregistre une partie terminée sur le compte KUMP, sans jamais faire
 * attendre l'écran de résultats ni lever d'erreur.
 *
 * ⚠️ Volontairement « tire et oublie » (pas d'`await` chez l'appelant) : le
 * compte KUMP est un plus, jamais une condition pour jouer. Une partie qui
 * n'arrive pas à partir est mise en file d'attente locale par le module et
 * repartira à la fin de la partie suivante — elle n'est pas perdue.
 *
 * @param {object} game Voir `recordGame()` dans `net/kump.js`.
 */
export function sendToKump(game) {
  if (!isKumpConfigured) return;
  import('./kump.js')
    .then((kump) => kump.recordGame(game))
    .catch((error) => console.warn('[kump] module indisponible', error));
}
