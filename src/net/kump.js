// Pont entre D-Track et le compte KUMP (module `kump-account`).
//
// Ce que le compte apporte à D-Track : une identité qui suit le joueur d'un
// appareil à l'autre, son temps de jeu, ses statistiques (parties, meilleur
// score, victoires en ligne) et ses trophées, visibles sur kump.fr/profil à
// côté de ses autres jeux KUMP.
//
// Ce que ça ne change PAS, et qui est important :
//
// 1. **Le solo reste jouable 100 % hors ligne.** Ce fichier n'est JAMAIS
//    importé statiquement — `main.js` et `solo.js` y accèdent par
//    `await import()`, comme `net/firebase.js`. Le SDK Firebase (~150 Ko)
//    n'est donc pas chargé tant qu'aucune partie n'est terminée.
// 2. **`storage.js` reste la source de vérité de l'affichage local.** Le
//    meilleur score et l'historique affichés à l'écran continuent de venir du
//    `localStorage` : le compte KUMP est un PLUS, jamais une condition pour
//    jouer. Si le module est mal configuré ou le réseau absent, D-Track
//    fonctionne exactement comme avant.
// 3. **Aucun compte n'est créé à l'ouverture de l'application.** Il l'est à la
//    PREMIÈRE PARTIE TERMINÉE. La différence n'est pas cosmétique : un compte
//    anonyme créé à chaque visite remplirait la base KUMP de comptes fantômes
//    (le panel admin de kump.fr ne scanne que les 1000 premiers) sans qu'aucun
//    joueur ne leur corresponde.
//
// ⚠️ NE JAMAIS ÉCRIRE DANS FIRESTORE DEPUIS CE FICHIER, ni appeler
// `saveGameData()` / `addPlaytime()` / `unlockTrophy()`. Depuis la phase 3 de
// l'audit KUMP, les règles Firestore refusent au client d'écrire son temps de
// jeu, ses statistiques et ses trophées — et le refus est SILENCIEUX (le
// module avale l'erreur et renvoie `false`). La seule voie légitime est
// `submitSession()`, qui demande au serveur de kump.fr d'écrire à notre place
// après avoir rejoué la partie.

import {
  initKump,
  isKumpReady,
  isGuest,
  getProfile,
  getCurrentUser,
  onUserChanged,
  ensureSignedIn,
  linkWithEmail,
  signInWithEmail,
  linkWithGoogle,
  signInWithGoogle,
  sendPasswordReset,
  signOutKump,
  setDisplayName,
  loadGameData,
  getUnlockedTrophies,
  getGameCatalog,
  submitSession,
  flushSessionQueue,
  pendingSessionCount,
} from 'kump-account';
// La config vit à part pour que le reste du jeu puisse la consulter sans
// importer ce fichier — donc sans tirer le SDK Firebase (voir kumpConfig.js).
import { kumpFirebaseConfig, kumpApiBaseUrl } from './kumpConfig.js';

/**
 * Identifiant du jeu côté compte KUMP : sert de nom de dossier aux données du
 * joueur (`users/{uid}/games/d-track`).
 *
 * ⚠️ DÉFINITIF. Le changer reviendrait à perdre la progression de tous les
 * joueurs de D-Track. Il est déjà inscrit tel quel dans le catalogue de
 * kump.fr (`src/lib/kump.ts > GAME_CATALOG`) et dans le registre du serveur
 * de validation (`src/lib/game/games/dtrack.ts`).
 */
const GAME_ID = 'd-track';

let started = false;

/**
 * Initialise le module au premier besoin réel. Idempotent.
 *
 * ⚠️ Le compte KUMP vit dans un AUTRE projet Firebase que D-Track
 * (`kump-812dd` contre `d-tack-37281`). Les deux cohabitent sans conflit :
 * `initKump()` crée une app Firebase NOMMÉE « kump » à côté de l'app par
 * défaut de `net/firebase.js`. Ne jamais tenter de les fusionner — ce sont
 * deux bases, deux jeux de règles, et deux sessions anonymes distinctes.
 */
function ensureStarted() {
  if (!started) {
    started = true;
    initKump({
      firebaseConfig: kumpFirebaseConfig,
      gameId: GAME_ID,
      // Serveur de validation (routes /api/game/* de kump.fr). Sans elle, les
      // parties resteraient en file d'attente locale sans jamais partir.
      apiBaseUrl: kumpApiBaseUrl,
    });
  }
  return isKumpReady();
}

/**
 * Initialise le module sans rien faire d'autre, et renvoie `true` s'il est
 * utilisable.
 *
 * Utile aux écrans fournis par `kump-account/ui` : ils refusent de s'ouvrir si
 * `initKump()` n'a jamais été appelée, et ils ne passent pas par ce fichier.
 */
export function startKump() {
  return ensureStarted();
}

// Réexportés tels quels pour l'écran de compte (`ui/account.js`). Le reste du
// jeu ne doit PAS les importer directement depuis 'kump-account' : passer par
// ce fichier garantit qu'`initKump()` a bien été appelée avant.
export {
  isGuest,
  getProfile,
  getCurrentUser,
  ensureSignedIn,
  sendPasswordReset,
  setDisplayName,
  loadGameData,
  getUnlockedTrophies,
  getGameCatalog,
  pendingSessionCount,
};

/**
 * Prépare le module SANS créer de compte, et prévient à chaque changement
 * d'utilisateur.
 *
 * ⚠️ Ne jamais remplacer par `ensureSignedIn()` pour « savoir qui est
 * connecté » : cette fonction-là CRÉE un compte anonyme s'il n'y en a pas.
 * Ouvrir l'écran de compte puis le refermer fabriquerait alors un compte
 * fantôme à chaque fois. Firebase restaure une session existante de façon
 * asynchrone : le callback est appelé avec l'utilisateur retrouvé, ou `null`
 * s'il n'y en a aucun.
 *
 * @param {(user: {uid: string, isAnonymous: boolean, email: string|null}|null) => void} callback
 * @returns {() => void} désabonnement, ou une fonction vide si le module est inactif
 */
export function watchAccount(callback) {
  if (!ensureStarted()) {
    callback(null);
    return () => {};
  }
  return onUserChanged(callback);
}

/**
 * Rattache un email au compte COURANT (`link*`), sans rien perdre.
 *
 * ⚠️ `link*` et non `signIn*` : le joueur a déjà un compte anonyme et des
 * parties enregistrées. `link*` garde le même identifiant interne, donc toute
 * sa progression ; `signIn*` basculerait vers un AUTRE compte et l'
 * abandonnerait. Les deux existent séparément dans le module précisément pour
 * rendre cette erreur impossible par distraction.
 */
export async function createAccount(email, password) {
  if (!ensureStarted()) return { success: false, error: 'not-ready' };
  // Un compte anonyme doit exister pour qu'il y ait quelque chose à rattacher.
  await ensureSignedIn();
  return linkWithEmail(email, password);
}

/**
 * Rattache un compte Google au compte courant. `linkWithGoogle`, pas
 * `signInWithGoogle` : la progression est conservée.
 *
 * ⚠️ Peut échouer avec `credential-in-use` — ce compte Google appartient déjà
 * à un AUTRE profil KUMP, typiquement parce que le joueur s'en est déjà servi
 * sur un autre jeu KUMP. Ce n'est pas une impasse : l'écran doit alors
 * proposer `loginWithGoogle()`. Voir `ui/account.js`.
 */
export async function createAccountWithGoogle() {
  if (!ensureStarted()) return { success: false, error: 'not-ready' };
  await ensureSignedIn();
  return linkWithGoogle();
}

/**
 * Bascule vers le compte Google — pour le joueur qui a DÉJÀ un profil KUMP.
 *
 * ⚠️ Abandonne la session anonyme en cours, comme `loginToAccount()`. À ne
 * proposer qu'après avoir prévenu le joueur, et seulement quand le
 * rattachement a échoué parce que l'identité est déjà prise.
 */
export async function loginWithGoogle() {
  if (!ensureStarted()) return { success: false, error: 'not-ready' };
  return signInWithGoogle();
}

/**
 * Connexion à un compte existant — bascule vers CE compte.
 *
 * ⚠️ Abandonne la session anonyme en cours. C'est le comportement voulu ici
 * (« j'ai déjà un compte, je le retrouve sur ce téléphone »), mais l'écran
 * doit le dire clairement au joueur avant de l'appeler.
 */
export async function loginToAccount(email, password) {
  if (!ensureStarted()) return { success: false, error: 'not-ready' };
  return signInWithEmail(email, password);
}

/** Déconnexion. Le joueur repart en invité ; ses parties locales restent. */
export async function logoutAccount() {
  if (!ensureStarted()) return;
  await signOutKump();
}

/**
 * Enregistre une partie terminée sur le compte KUMP.
 *
 * Le jeu ne DÉCLARE pas son score : il envoie de quoi le RECALCULER — le
 * symbole de départ, la séquence des 12 lancers et l'ordre exact des 24
 * placements. Le serveur rejoue la partie avec les mêmes règles pures
 * (`game/grid.js`, `game/scoring.js`, dont il détient une copie) et refuse au
 * premier placement illégal. Un score annoncé n'est jamais cru.
 *
 * Ne lève jamais : une partie qui ne part pas ne doit pas casser l'écran de
 * résultats. Le pire cas est une partie mise en file et envoyée plus tard.
 *
 * @param {object}   game
 * @param {'solo'|'online'} game.mode
 * @param {number}   game.initialSymbol  Index du symbole posé en [0,0] (0–5).
 * @param {number[]} game.rolls          Les 24 faces à plat (voir game/dice.js).
 * @param {Array<{cell:number,die:0|1}>} game.moves  Les 24 placements, dans l'ordre.
 * @param {number}   game.durationMs     Durée réelle de la partie.
 * @param {boolean} [game.won]           Victoire — mode en ligne uniquement.
 * @returns {Promise<null|{accepted:boolean,queued?:boolean,refused?:boolean,
 *   reason?:string,stats?:object,trophies?:string[]}>}
 */
export async function recordGame({ mode, initialSymbol, rolls, moves, durationMs, won }) {
  if (!ensureStarted()) return null;

  try {
    // On vide la file AVANT d'envoyer la partie du jour : les parties
    // s'enregistrent ainsi dans l'ordre où elles ont été jouées. C'est aussi
    // le seul moment où on est sûr que le module est chargé — D-Track ne le
    // charge pas au démarrage, précisément pour ne pas payer le SDK Firebase
    // sur un mode solo qui doit rester hors ligne.
    await flushSessionQueue();

    return await submitSession({
      kind: mode,
      durationMs,
      payload: { initialSymbol, rolls, moves, ...(mode === 'online' ? { won: won === true } : {}) },
    });
  } catch (error) {
    // Le compte est un plus, jamais une condition : on ne laisse rien
    // remonter jusqu'à l'écran de résultats.
    console.warn('[kump] enregistrement de la partie impossible', error);
    return null;
  }
}
