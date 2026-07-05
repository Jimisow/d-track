// Orchestration du mode multijoueur : lobby → partie → résultats → revanche.
//
// Principe de synchronisation : l'hôte a généré les 12 lancers partagés à la
// création (doc Firestore). Chaque joueur avance à son rythme ; le tour N ne se
// débloque que lorsque TOUS les joueurs actifs ont validé le tour N−1
// (progress = min des progressions). La mise en place (choix du symbole
// initial) se fait dans l'ordre du salon (hôte d'abord) : `pickOrder`/
// `pickIndex` désignent qui doit choisir, `progress` reste -1 tant qu'un
// joueur n'a pas choisi son symbole.

import * as net from '../net/firebase.js';
import { rollForTurn, TURNS } from '../game/dice.js';
import { scoreGrid } from '../game/scoring.js';
import { setActiveGame, getPlayerName } from '../storage.js';
import { $, el, toast, showScreen, currentScreen } from './dom.js';
import { getBoard } from './gameScreen.js';
import { showMultiResults } from './results.js';
import { goHome } from './home.js';

const WAIT_TIMEOUT_MS = 90 * 1000; // délai avant "Continuer sans lui"
const HEARTBEAT_MS = 25 * 1000;
const HOST_CHECK_MS = 30 * 1000;

let state = null;

// --- Entrée dans une session ----------------------------------------------------

export async function createOnline(name) {
  const { code, uid } = await net.createGame(name);
  enterSession(code, uid);
}

export async function joinOnline(code, name) {
  const { uid } = await net.joinGame(code, name);
  enterSession(code.trim().toUpperCase(), uid);
}

// Reprise après fermeture/déconnexion (bouton "Reprendre" de l'accueil).
export async function resumeOnline(code) {
  const name = getPlayerName() || 'Joueur';
  await joinOnline(code, name);
}

function enterSession(code, uid) {
  leaveSession(false);
  state = {
    code, uid,
    data: null,
    playingTurn: null,       // tour en cours d'affichage ('pick' ou 1–12)
    initialCommitted: false, // le symbole initial a-t-il déjà été appliqué localement ?
    inGame: false,
    resultsShown: false,
    waitingKey: null,      // signature des retardataires (reset du chrono 90 s)
    waitingSince: 0,
    waitingTicker: null,
    lastHostCheck: 0,
    unsub: null,
    hbTimer: null
  };
  setActiveGame(code);
  state.hbTimer = setInterval(() => net.heartbeat(code, uid), HEARTBEAT_MS);
  state.unsub = net.watchGame(code, onSnapshotData, (err) => {
    console.error(err);
    toast(net.frenchError(err));
  });
  showScreen('lobby');
}

function leaveSession(clearStored = true) {
  if (!state) { if (clearStored) setActiveGame(null); return; }
  state.unsub?.();
  clearInterval(state.hbTimer);
  clearInterval(state.waitingTicker);
  hideWaiting();
  if (clearStored) setActiveGame(null);
  state = null;
}

// --- Routage des instantanés Firestore -------------------------------------------

function onSnapshotData(data) {
  if (!state) return;

  if (!data) {
    toast('Ce salon n’existe plus.');
    leaveSession(true);
    goHome();
    return;
  }
  state.data = data;

  const me = data.players?.[state.uid];
  if (!me) {
    toast('Vous ne faites plus partie de ce salon.');
    leaveSession(true);
    goHome();
    return;
  }
  if (me.abandoned) {
    toast('Vous avez été marqué comme absent : la partie a continué sans vous.');
    leaveSession(true);
    goHome();
    return;
  }

  maybeMigrateHost(data);

  if (data.status === 'lobby') {
    // Salon initial OU revanche : on (re)passe au lobby.
    state.inGame = false;
    state.playingTurn = null;
    state.resultsShown = false;
    hideWaiting();
    renderLobby(data, me);
    if (currentScreen() !== 'lobby') showScreen('lobby');
  } else if (data.status === 'playing') {
    handlePlaying(data, me);
  } else if (data.status === 'finished') {
    handleFinished(data);
  }
}

// Si l'hôte est silencieux depuis trop longtemps, le doyen des joueurs actifs le remplace.
function maybeMigrateHost(data) {
  const now = Date.now();
  if (now - state.lastHostCheck < HOST_CHECK_MS) return;
  const host = data.players?.[data.hostId];
  if (!host || host.abandoned || now - (host.lastSeenAt || 0) > net.STALE_HOST_MS) {
    state.lastHostCheck = now;
    net.claimHostIfStale(state.code, state.uid);
  }
}

// --- Lobby ------------------------------------------------------------------------

function renderLobby(data, me) {
  const isHost = data.hostId === state.uid;

  const codeBtn = $('#lobby-code');
  codeBtn.textContent = state.code;
  codeBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(state.code);
      toast('Code copié !');
    } catch { /* clipboard indisponible */ }
  };

  const list = $('#lobby-players');
  list.innerHTML = '';
  const players = Object.entries(data.players || {})
    .sort((a, b) => (a[1].joinedAt || 0) - (b[1].joinedAt || 0));

  for (const [uid, p] of players) {
    list.append(el('li', {},
      el('span', {}, uid === data.hostId ? '👑' : '🎮'),
      el('span', {}, `${p.name}${uid === state.uid ? ' (vous)' : ''}`),
      el('span', { class: `tag ${p.ready ? 'ok' : ''}` }, p.ready ? 'Prêt ✔' : 'Pas prêt')
    ));
  }

  const readyBtn = $('#btn-ready');
  readyBtn.textContent = me.ready ? '❌ Pas prêt' : '✅ Je suis prêt';
  readyBtn.onclick = () => net.setReady(state.code, state.uid, !me.ready)
    .catch((err) => toast(net.frenchError(err)));

  const startBtn = $('#btn-start');
  const everyoneReady = players.length >= 2 && players.every(([, p]) => p.ready);
  startBtn.hidden = !isHost;
  startBtn.disabled = !everyoneReady;
  startBtn.onclick = () => net.startGame(state.code, data).catch((err) => toast(net.frenchError(err)));

  $('#lobby-hint').textContent = players.length < 2
    ? 'En attente d’autres joueurs (2 minimum)…'
    : everyoneReady
      ? (isHost ? 'Tout le monde est prêt, à vous de lancer !' : 'En attente du lancement par l’hôte…')
      : 'La partie démarre quand tout le monde est prêt.';

  $('#lobby-leave').onclick = () => { leaveSession(true); goHome(); };
}

// --- Partie -----------------------------------------------------------------------

function handlePlaying(data, me) {
  const board = getBoard();

  if (!state.inGame) {
    state.inGame = true;
    state.resultsShown = false;
    state.playingTurn = null;
    state.initialCommitted = false;

    board.onQuit = () => {
      if (confirm('Quitter ? Vous pourrez reprendre cette partie avec le même code.')) {
        leaveSession(false); // on garde le code mémorisé pour "Reprendre"
        goHome();
      }
    };
    board.onCommit = onCommit;
    board.onPick = (symbolId) => net.claimInitialSymbol(state.code, state.uid, symbolId);
    board.reset(me.grid); // grille vide, ou restaurée en cas de reprise
    showScreen('game');
  }

  syncTurn(data, me);
}

// Infos pour l'écran de choix du symbole initial : qui doit choisir, et
// quelles formes sont déjà prises par d'autres joueurs.
function pickPhaseInfo(data) {
  const order = data.pickOrder || [];
  const idx = data.pickIndex || 0;
  const whoseTurnUid = order[idx];
  const takenSymbols = new Set(
    Object.values(data.players)
      .map((p) => p.initialSymbol)
      .filter((s) => s !== null && s !== undefined)
  );
  return {
    takenSymbols,
    myTurn: whoseTurnUid === state.uid,
    whoseTurnName: data.players[whoseTurnUid]?.name
  };
}

// Cœur de la synchro : décide si on joue, on attend, ou on termine.
function syncTurn(data, me) {
  const board = getBoard();
  const active = Object.values(data.players).filter((p) => !p.abandoned);
  const minProgress = Math.min(...active.map((p) => p.progress ?? -1));
  const myProgress = me.progress ?? -1;

  // Mise en place : choix libre (ou séquentiel en multi) du symbole initial,
  // sans dé — se réévalue à chaque instantané pour refléter en temps réel
  // les formes prises par les autres et à qui le tour de choisir revient.
  if (myProgress === -1) {
    hideWaiting();
    board.beginPickPhase(pickPhaseInfo(data));
    state.playingTurn = 'pick';
    return;
  }

  // Transition unique depuis la mise en place : applique le symbole initial
  // sur le plateau local. Ignoré en cas de reprise (la case [0,0] est alors
  // déjà remplie par board.reset() juste au-dessus).
  if (!state.initialCommitted) {
    state.initialCommitted = true;
    if (board.grid[0] === null && me.grid && me.grid[0] !== -1) {
      board.commitInitialPick(me.grid[0]);
    }
  }

  // Tours partagés 1–12.
  if (myProgress < TURNS) {
    if (minProgress >= myProgress) {
      // Tout le monde a rattrapé : le tour suivant se débloque.
      hideWaiting();
      const next = myProgress + 1;
      if (state.playingTurn !== next) {
        state.playingTurn = next;
        board.beginTurn(next, rollForTurn(data.sharedRolls, next));
      }
    } else {
      showWaiting(data, myProgress);
    }
    return;
  }

  // J'ai fini mes 12 tours.
  if (active.every((p) => (p.progress ?? -1) >= TURNS)) {
    hideWaiting();
    if (data.hostId === state.uid) {
      net.finishGame(state.code).catch(() => {});
    }
  } else {
    showWaiting(data, TURNS);
  }
}

// Validation d'un tour : publication de la grille + progression (+ score au 12e).
async function onCommit({ grid, turn }) {
  const progress = turn === 0 ? 0 : turn;
  const score = turn === TURNS ? scoreGrid(grid, { finalScoring: true }).total : null;
  const firestoreGrid = grid.map((c) => (c === null ? -1 : c));

  // Petites reprises automatiques : la 4G peut tousser au mauvais moment.
  for (let attempt = 1; ; attempt++) {
    try {
      await net.submitProgress(state.code, state.uid, firestoreGrid, progress, score);
      return;
    } catch (err) {
      if (attempt >= 3 || !state) {
        toast(net.frenchError(err));
        return;
      }
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

// --- Attente des autres joueurs ------------------------------------------------------

function showWaiting(data, threshold) {
  const overlay = $('#waiting-overlay');
  const laggards = Object.entries(data.players)
    .filter(([, p]) => !p.abandoned && (p.progress ?? -1) < threshold)
    .map(([uid, p]) => ({ uid, name: p.name }));

  // Nouveau groupe de retardataires → on remet le chrono de 90 s à zéro.
  const key = laggards.map((l) => l.uid).sort().join(',') + '|' + threshold;
  if (state.waitingKey !== key) {
    state.waitingKey = key;
    state.waitingSince = Date.now();
  }

  const list = $('#waiting-list');
  list.innerHTML = '';
  for (const l of laggards) list.append(el('li', {}, `${l.name}…`));

  // Après 90 s, l'hôte peut poursuivre sans les absents.
  const hostActions = $('#waiting-host-actions');
  hostActions.innerHTML = '';
  const isHost = data.hostId === state.uid;
  if (isHost && Date.now() - state.waitingSince >= WAIT_TIMEOUT_MS) {
    for (const l of laggards) {
      hostActions.append(el('button', {
        class: 'btn btn-small',
        onclick: () => net.markAbandoned(state.code, l.uid)
          .then(() => toast(`${l.name} a été marqué comme absent.`))
          .catch((err) => toast(net.frenchError(err)))
      }, `Continuer sans ${l.name}`));
    }
  }

  overlay.hidden = false;

  // Aucun instantané n'arrive tant que personne ne joue : un ticker local
  // réévalue l'affichage (apparition du bouton d'exclusion à 90 s).
  if (!state.waitingTicker) {
    state.waitingTicker = setInterval(() => {
      if (state?.data && state.data.status === 'playing') {
        const meNow = state.data.players?.[state.uid];
        if (meNow) syncTurn(state.data, meNow);
      }
    }, 5000);
  }
}

function hideWaiting() {
  const overlay = $('#waiting-overlay');
  if (overlay) overlay.hidden = true;
  if (state?.waitingTicker) {
    clearInterval(state.waitingTicker);
    state.waitingTicker = null;
  }
  if (state) state.waitingKey = null;
}

// --- Fin de partie et revanche ---------------------------------------------------------

function handleFinished(data) {
  hideWaiting();
  state.inGame = false;
  state.playingTurn = null;

  const firstTime = !state.resultsShown;
  state.resultsShown = true;

  showMultiResults(data, state.uid, {
    isHost: data.hostId === state.uid,
    celebrate: firstTime,
    onRematch: () => net.rematch(state.code).catch((err) => toast(net.frenchError(err))),
    onHome: () => { leaveSession(true); goHome(); }
  });
}
