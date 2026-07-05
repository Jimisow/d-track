// Écran de résultats — solo (détail + record) et multijoueur (classement + grilles).
import { scoreGrid, rankPlayers } from '../game/scoring.js';
import { getBestScore } from '../storage.js';
import { $, el, showScreen } from './dom.js';
import { zoneBreakdown, miniGrid, staticGrid } from './components.js';
import { launchConfetti } from './confetti.js';

const MEDALS = ['🥇', '🥈', '🥉'];

export function showSoloResults(grid, { isRecord, onReplay, onHome }) {
  const content = $('#results-content');
  const actions = $('#results-actions');
  content.innerHTML = '';
  actions.innerHTML = '';

  const total = scoreGrid(grid, { finalScoring: true }).total;

  if (isRecord) {
    content.append(el('p', { class: 'record-badge' }, '🎉 Nouveau record personnel !'));
    launchConfetti();
  }

  content.append(
    el('div', { class: 'total-row', style: 'margin:4px 0 14px' },
      el('span', {}, 'Votre score'),
      el('span', {}, `${total} pts`)
    ),
    el('p', { style: 'color:var(--text-dim);font-weight:600;margin:0 0 6px' },
      `Meilleur score : ${getBestScore() ?? '—'} pts`),
    el('div', { class: 'score-title' }, 'Détail zone par zone'),
    zoneBreakdown(grid)
  );

  actions.append(
    el('button', { class: 'btn btn-primary btn-big', onclick: onReplay }, '🔁 Rejouer'),
    el('button', { class: 'btn btn-big', onclick: onHome }, '🏠 Accueil')
  );

  showScreen('results');
}

// data = document Firestore ; myUid = joueur local.
export function showMultiResults(data, myUid, { onRematch, onHome, isHost, celebrate = true }) {
  const content = $('#results-content');
  const actions = $('#results-actions');
  content.innerHTML = '';
  actions.innerHTML = '';

  // Score : celui écrit par le joueur, sinon recalcul local depuis sa grille (secours).
  const entries = Object.entries(data.players || {})
    .filter(([, p]) => !p.abandoned)
    .map(([uid, p]) => ({
      uid,
      name: p.name,
      grid: (p.grid || []).map((c) => (c === -1 ? null : c)),
      score: typeof p.score === 'number'
        ? p.score
        : scoreGrid((p.grid || []).map((c) => (c === -1 ? null : c)), { finalScoring: true }).total
    }));

  const ranked = rankPlayers(entries);
  const podium = el('div', { class: 'results-podium' });

  for (const player of ranked) {
    const isMe = player.uid === myUid;
    const row = el('button', {
      class: `result-row ${player.rank === 1 ? 'winner' : ''}`,
      title: 'Voir la grille',
      onclick: () => openViewer(player)
    },
      el('span', { class: 'rank' }, MEDALS[player.rank - 1] || `${player.rank}.`),
      el('span', {}, `${player.name}${isMe ? ' (vous)' : ''}${ranked.filter((r) => r.rank === player.rank).length > 1 ? ' — ex æquo' : ''}`),
      el('span', { class: 'mini' }, miniGrid(player.grid)),
      el('span', { class: 'score' }, `${player.score} pts`)
    );
    podium.append(row);
  }

  const me = ranked.find((r) => r.uid === myUid);
  if (me?.rank === 1 && celebrate) launchConfetti();

  content.append(podium);

  // Joueurs marqués comme ayant abandonné.
  const gone = Object.values(data.players || {}).filter((p) => p.abandoned);
  if (gone.length) {
    content.append(el('p', { style: 'color:var(--text-dim);font-weight:600' },
      `A abandonné : ${gone.map((p) => p.name).join(', ')}`));
  }

  if (me) {
    content.append(el('div', { class: 'score-title' }, 'Votre détail zone par zone'), zoneBreakdown(me.grid));
  }

  if (isHost) {
    actions.append(el('button', { class: 'btn btn-primary btn-big', onclick: onRematch }, '🔁 Rejouer (même salon)'));
  } else {
    actions.append(el('p', { class: 'lobby-hint', style: 'margin:0' }, 'L’hôte peut lancer une revanche dans le même salon…'));
  }
  actions.append(el('button', { class: 'btn btn-big', onclick: onHome }, '🏠 Accueil'));

  showScreen('results');
}

function openViewer(player) {
  const dialog = $('#grid-viewer');
  const inner = $('#grid-viewer-content');
  inner.innerHTML = '';
  inner.append(
    el('h3', { style: 'margin:0 0 10px' }, `${player.name} — ${player.score} pts`),
    staticGrid(player.grid),
    zoneBreakdown(player.grid)
  );
  dialog.showModal();
}
