// Effets sonores du jeu — un seul <audio> par son, rejoué via un clone léger
// pour ne jamais bloquer un son sur l'autre lors d'actions rapprochées
// (ex. plusieurs zones complétées par le même placement).
//
// BASE_URL (préfixé par `base` dans vite.config.js) est nécessaire car l'app
// est déployée dans un sous-dossier (GitHub Pages) : un chemin en dur "/sounds/…"
// ignorerait ce préfixe et pointerait hors du site.
const base = import.meta.env.BASE_URL;
const FILES = {
  dice: `${base}sounds/des.mp3`,   // lancer de dés
  place: `${base}sounds/set.mp3`,  // symbole posé dans la grille
  gain: `${base}sounds/add.mp3`,   // zone complétée : gain de points
  lose: `${base}sounds/lose.mp3`   // zone complétée : malus
};

const pool = {};

function getAudio(name) {
  if (!pool[name]) pool[name] = new Audio(FILES[name]);
  return pool[name];
}

export function playSound(name) {
  const base = getAudio(name);
  const node = base.cloneNode();
  // Autoplay bloqué, fichier absent, etc. : ne doit jamais casser le jeu.
  node.play().catch(() => {});
}
