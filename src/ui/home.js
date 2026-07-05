// Écran d'accueil : rafraîchit le meilleur score et le bouton "Reprendre".
import { $, showScreen } from './dom.js';
import { getBestScore, getActiveGame } from '../storage.js';

export function refreshHome() {
  const best = getBestScore();
  $('#home-stats').hidden = best === null;
  $('#home-best').textContent = best === null ? '—' : `${best} pts`;

  const active = getActiveGame();
  $('#btn-resume').hidden = !active;
  if (active) $('#resume-code').textContent = `(${active.code})`;
}

export function goHome() {
  refreshHome();
  showScreen('home');
}
