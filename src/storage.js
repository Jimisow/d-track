// Persistance locale (localStorage) : meilleur score solo, historique des
// 20 dernières parties, pseudo, thème, partie en ligne en cours (reprise).

const KEYS = {
  best: 'dtrack.best',
  history: 'dtrack.history',
  name: 'dtrack.name',
  theme: 'dtrack.theme',
  activeGame: 'dtrack.activeGame',
  localUid: 'dtrack.localUid'
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Stockage plein ou indisponible : non bloquant.
  }
}

// --- Solo -------------------------------------------------------------------

export function getBestScore() {
  return read(KEYS.best, null);
}

export function getHistory() {
  return read(KEYS.history, []);
}

// Enregistre une partie solo terminée ; retourne true si c'est un nouveau record.
export function saveSoloResult(score) {
  const history = getHistory();
  history.unshift({ score, date: new Date().toISOString() });
  write(KEYS.history, history.slice(0, 20)); // 20 dernières parties max

  const best = getBestScore();
  const isRecord = best === null || score > best;
  if (isRecord) write(KEYS.best, score);
  return isRecord;
}

// --- Préférences ------------------------------------------------------------

export function getPlayerName() {
  return read(KEYS.name, '');
}

export function setPlayerName(name) {
  write(KEYS.name, name);
}

export function getTheme() {
  return read(KEYS.theme, 'dark');
}

export function setTheme(theme) {
  write(KEYS.theme, theme);
}

// --- Reprise de partie en ligne ----------------------------------------------

export function getActiveGame() {
  return read(KEYS.activeGame, null); // { code } ou null
}

export function setActiveGame(code) {
  if (code) write(KEYS.activeGame, { code });
  else localStorage.removeItem(KEYS.activeGame);
}

// UID de secours si l'authentification anonyme Firebase échoue.
export function getLocalUid() {
  let uid = read(KEYS.localUid, null);
  if (!uid) {
    uid = 'local-' + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
    write(KEYS.localUid, uid);
  }
  return uid;
}
