// Couche réseau Firebase (Firestore + Auth anonyme).
//
// L'initialisation est PARESSEUSE : le mode solo n'importe jamais ce module
// dynamiquement chargé, donc il fonctionne 100% hors-ligne.
//
// Modèle de données — collection `games`, document {code} :
// {
//   hostId, status: 'lobby'|'playing'|'finished', createdAt,
//   sharedRolls: [24 entiers 0–5],   // 12 lancers à plat (Firestore interdit les tableaux imbriqués)
//   pickOrder: [uid, ...],           // ordre de choix du symbole initial (hôte d'abord)
//   pickIndex: number,               // index dans pickOrder du joueur dont c'est le tour de choisir
//   players: {
//     uid: { name, ready, progress, grid, initialSymbol, score, abandoned, joinedAt, lastSeenAt }
//   }
// }
// `progress` : -1 = symbole initial pas encore choisi, 0 = choisi (case [0,0] posée),
// k = tours partagés validés (1–12).
// `grid` : tableau de 25 entrées, -1 = case vide (on évite null pour la lisibilité Firestore).
// `initialSymbol` : index du symbole (0–5) choisi à la mise en place, ou null.

import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, getDoc, updateDoc, onSnapshot,
  serverTimestamp, runTransaction
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { generateSharedRolls, generateCode, isValidCode } from '../game/dice.js';
import { getLocalUid } from '../storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAro0BVsyPSXOMAUGcVgaCd4or38TwaOoE',
  authDomain: 'd-tack-37281.firebaseapp.com',
  projectId: 'd-tack-37281',
  storageBucket: 'd-tack-37281.firebasestorage.app',
  messagingSenderId: '867642937290',
  appId: '1:867642937290:web:2d5abfacf5c588e75b4933'
};

export const MAX_PLAYERS = 6;
export const GAME_TTL_MS = 24 * 60 * 60 * 1000; // parties de plus de 24 h ignorées

let app = null;
let db = null;
let uid = null;

function ensureInit() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}

// Identité stable du joueur : Auth anonyme Firebase, ou UUID local en secours
// (dans ce cas les règles Firestore exigeant l'auth bloqueront les écritures —
// voir README : activer l'authentification anonyme dans la console).
export async function ensureAuth() {
  if (uid) return uid;
  ensureInit();
  try {
    const auth = getAuth(app);
    if (!auth.currentUser) await signInAnonymously(auth);
    uid = auth.currentUser.uid;
  } catch (err) {
    console.warn('Auth anonyme indisponible, repli sur un UID local :', err);
    uid = getLocalUid();
  }
  return uid;
}

export function getUid() {
  return uid;
}

function gameRef(code) {
  return doc(ensureInit(), 'games', code.toUpperCase());
}

function isStale(data) {
  const created = data?.createdAt?.toMillis?.();
  return created ? Date.now() - created > GAME_TTL_MS : false;
}

function newPlayer(name) {
  return {
    name,
    ready: false,
    progress: -1,
    grid: Array(25).fill(-1),
    initialSymbol: null,
    score: null,
    abandoned: false,
    joinedAt: Date.now(),
    lastSeenAt: Date.now()
  };
}

// Ordre de choix du symbole initial : l'hôte d'abord, puis les autres joueurs
// dans leur ordre d'arrivée dans le lobby.
function computePickOrder(data) {
  const others = Object.entries(data.players || {})
    .filter(([uid]) => uid !== data.hostId)
    .sort((a, b) => (a[1].joinedAt || 0) - (b[1].joinedAt || 0))
    .map(([uid]) => uid);
  return [data.hostId, ...others];
}

// Traduit les erreurs Firebase en messages utilisateur en français.
export function frenchError(err) {
  const code = err?.code || '';
  if (code.includes('permission-denied')) {
    return 'Accès refusé par le serveur. Vérifiez que l’authentification anonyme et les règles Firestore sont bien configurées.';
  }
  if (code.includes('unavailable') || err?.message === 'offline') {
    return 'Connexion impossible. Vérifiez votre réseau et réessayez.';
  }
  return err?.userMessage || 'Une erreur est survenue. Réessayez.';
}

function userError(message) {
  const e = new Error(message);
  e.userMessage = message;
  return e;
}

// --- Cycle de vie d'une partie ------------------------------------------------

// Crée une partie : génère un code unique (transaction anti-collision) et la
// séquence complète des 12 lancers partagés. Retourne { code, uid }.
export async function createGame(name) {
  const myUid = await ensureAuth();
  const database = ensureInit();

  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateCode();
    try {
      await runTransaction(database, async (tx) => {
        const ref = doc(database, 'games', code);
        const snap = await tx.get(ref);
        // Collision : on ne réutilise le code que si la partie est périmée (>24 h).
        if (snap.exists() && !isStale(snap.data())) throw userError('collision');
        tx.set(ref, {
          hostId: myUid,
          status: 'lobby',
          createdAt: serverTimestamp(),
          sharedRolls: generateSharedRolls(),
          players: { [myUid]: newPlayer(name) }
        });
      });
      return { code, uid: myUid };
    } catch (err) {
      if (err.userMessage === 'collision') continue; // nouveau code, on retente
      throw err;
    }
  }
  throw userError('Impossible de générer un code de salon libre. Réessayez.');
}

// Rejoint une partie existante. Retourne { code, uid, rejoined }.
export async function joinGame(code, name) {
  code = (code || '').trim().toUpperCase();
  if (!isValidCode(code)) throw userError('Code de salon invalide (5 lettres/chiffres).');
  const myUid = await ensureAuth();
  const database = ensureInit();

  let rejoined = false;
  await runTransaction(database, async (tx) => {
    const ref = doc(database, 'games', code);
    const snap = await tx.get(ref);
    if (!snap.exists() || isStale(snap.data())) throw userError('Ce salon n’existe pas.');
    const data = snap.data();
    const already = !!data.players?.[myUid];

    if (already) {
      // Reprise après déconnexion : on réactive simplement le joueur.
      rejoined = true;
      tx.update(ref, {
        [`players.${myUid}.lastSeenAt`]: Date.now(),
        [`players.${myUid}.abandoned`]: false
      });
      return;
    }
    if (data.status !== 'lobby') throw userError('La partie a déjà commencé.');
    if (Object.keys(data.players || {}).length >= MAX_PLAYERS) throw userError('Ce salon est complet (6 joueurs max).');
    tx.update(ref, { [`players.${myUid}`]: newPlayer(name) });
  });
  return { code, uid: myUid, rejoined };
}

// Lecture ponctuelle (pour la reprise de partie).
export async function fetchGame(code) {
  const snap = await getDoc(gameRef(code));
  if (!snap.exists() || isStale(snap.data())) return null;
  return snap.data();
}

// Abonnement temps réel. Retourne la fonction de désabonnement.
export function watchGame(code, onData, onError) {
  return onSnapshot(
    gameRef(code),
    (snap) => onData(snap.exists() ? snap.data() : null),
    (err) => onError?.(err)
  );
}

// --- Actions joueur -----------------------------------------------------------

export function setReady(code, myUid, ready) {
  return updateDoc(gameRef(code), { [`players.${myUid}.ready`]: ready });
}

// `data` = dernier instantané connu du lobby (pour calculer l'ordre de choix
// du symbole initial : hôte d'abord, puis les autres par ordre d'arrivée).
export function startGame(code, data) {
  return updateDoc(gameRef(code), {
    status: 'playing',
    pickOrder: computePickOrder(data),
    pickIndex: 0
  });
}

// Choix du symbole initial (mise en place) : transaction pour garantir
// l'unicité (2 joueurs ne peuvent pas prendre le même symbole) et le respect
// de l'ordre de choix séquentiel.
export async function claimInitialSymbol(code, myUid, symbolId) {
  const database = ensureInit();
  await runTransaction(database, async (tx) => {
    const ref = doc(database, 'games', code);
    const snap = await tx.get(ref);
    if (!snap.exists()) throw userError('Ce salon n’existe plus.');
    const data = snap.data();
    const order = data.pickOrder || [];
    const idx = data.pickIndex || 0;
    if (order[idx] !== myUid) throw userError('Ce n’est pas votre tour de choisir.');
    const taken = new Set(
      Object.values(data.players || {})
        .map((p) => p.initialSymbol)
        .filter((s) => s !== null && s !== undefined)
    );
    if (taken.has(symbolId)) throw userError('Cette forme a déjà été choisie par un autre joueur.');

    const grid = Array(25).fill(-1);
    grid[0] = symbolId;
    tx.update(ref, {
      [`players.${myUid}.initialSymbol`]: symbolId,
      [`players.${myUid}.grid`]: grid,
      [`players.${myUid}.progress`]: 0,
      [`players.${myUid}.lastSeenAt`]: Date.now(),
      pickIndex: idx + 1
    });
  });
}

// Publie la grille et la progression après une validation (tour initial : progress = 0).
export function submitProgress(code, myUid, grid, progress, score = null) {
  const payload = {
    [`players.${myUid}.grid`]: grid.map((c) => (c === null || c === undefined ? -1 : c)),
    [`players.${myUid}.progress`]: progress,
    [`players.${myUid}.lastSeenAt`]: Date.now()
  };
  if (score !== null) payload[`players.${myUid}.score`] = score;
  return updateDoc(gameRef(code), payload);
}

export function finishGame(code) {
  return updateDoc(gameRef(code), { status: 'finished' });
}

// L'hôte écarte un joueur qui ne répond plus. Si c'était justement son tour
// de choisir le symbole initial, on avance l'ordre de choix pour ne pas
// bloquer indéfiniment les joueurs suivants.
export async function markAbandoned(code, targetUid) {
  const database = ensureInit();
  await runTransaction(database, async (tx) => {
    const ref = doc(database, 'games', code);
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const updates = { [`players.${targetUid}.abandoned`]: true };
    const order = data.pickOrder || [];
    const idx = data.pickIndex || 0;
    if (data.status === 'playing' && order[idx] === targetUid) {
      updates.pickIndex = idx + 1;
    }
    tx.update(ref, updates);
  });
}

// Présence : battement de cœur périodique.
export function heartbeat(code, myUid) {
  return updateDoc(gameRef(code), { [`players.${myUid}.lastSeenAt`]: Date.now() }).catch(() => {});
}

// Migration d'hôte : si l'hôte est silencieux depuis STALE_HOST_MS, le plus
// ancien joueur actif restant se proclame hôte (transaction pour éviter les doublons).
export const STALE_HOST_MS = 75 * 1000;

export async function claimHostIfStale(code, myUid) {
  const database = ensureInit();
  await runTransaction(database, async (tx) => {
    const ref = doc(database, 'games', code);
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const host = data.players?.[data.hostId];
    const hostSilent = !host || host.abandoned || Date.now() - (host.lastSeenAt || 0) > STALE_HOST_MS;
    if (!hostSilent) return;
    // Le candidat légitime : joueur actif le plus ancien (hors hôte actuel).
    const candidates = Object.entries(data.players || {})
      .filter(([id, p]) => id !== data.hostId && !p.abandoned)
      .sort((a, b) => (a[1].joinedAt || 0) - (b[1].joinedAt || 0));
    if (candidates.length && candidates[0][0] === myUid) {
      tx.update(ref, { hostId: myUid });
    }
  }).catch(() => {});
}

// Revanche : l'hôte réinitialise le MÊME document (même salon, mêmes joueurs).
export async function rematch(code) {
  const database = ensureInit();
  await runTransaction(database, async (tx) => {
    const ref = doc(database, 'games', code);
    const snap = await tx.get(ref);
    if (!snap.exists()) throw userError('Ce salon n’existe plus.');
    const data = snap.data();
    const players = {};
    for (const [id, p] of Object.entries(data.players || {})) {
      if (p.abandoned) continue; // les joueurs partis ne sont pas réinvités
      players[id] = { ...newPlayer(p.name), joinedAt: p.joinedAt || Date.now() };
    }
    tx.update(ref, {
      status: 'lobby',
      createdAt: serverTimestamp(),
      sharedRolls: generateSharedRolls(),
      pickOrder: [],
      pickIndex: 0,
      players
    });
  });
}
