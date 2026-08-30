// Écran « Compte KUMP » — connexion, création de compte et profil.
//
// Le compte KUMP est partagé par tous les jeux KUMP : une seule identité, un
// temps de jeu cumulé, des statistiques par jeu et des trophées, visibles
// aussi sur kump.fr/profil.
//
// TROIS PRINCIPES, à ne pas défaire :
//
// 1. **Jouer ne demande jamais de compte.** Cet écran est une porte ouverte,
//    pas un péage. Un joueur qui ne s'en sert jamais garde toutes ses parties
//    dans son `localStorage`, exactement comme avant.
// 2. **Rien n'est perdu en créant un compte.** Le joueur a déjà un compte
//    anonyme (créé à sa première partie terminée) : on le RATTACHE à un email
//    (`link*`), on ne bascule pas vers un autre (`signIn*`). Même identifiant
//    interne, donc mêmes parties. Voir `net/kump.js`.
// 3. **Ouvrir cet écran ne crée aucun compte.** On observe l'état
//    (`watchAccount`) sans jamais appeler `ensureSignedIn()` tant que le
//    joueur n'agit pas — sinon chaque coup d'œil fabriquerait un compte
//    anonyme fantôme dans la base KUMP.
//
// Ce fichier est chargé PARESSEUSEMENT (voir `ui/accountButton.js`) : il tire
// le SDK Firebase, il n'a rien à faire dans le chunk de démarrage.

import { el, toast } from './dom.js';
import { setKumpName } from '../storage.js';
import * as kump from '../net/kump.js';

// Messages destinés au joueur. Le module ne renvoie que des CODES courts et
// stables ; chaque projet écrit ses propres phrases, dans son ton.
const ERREURS = {
  'email-already-in-use': 'Un compte existe déjà avec cet email — connectez-vous.',
  'weak-password': 'Mot de passe trop court (6 caractères minimum).',
  'invalid-email': "Cet email n'a pas l'air valide.",
  'user-not-found': "Aucun compte avec cet email — créez le vôtre si c'est votre première fois.",
  'wrong-password': 'Email ou mot de passe incorrect.',
  'invalid-credential': 'Email ou mot de passe incorrect.',
  'too-many-requests': 'Trop de tentatives — réessayez dans quelques minutes.',
  'already-linked': 'Ce compte Google est déjà rattaché à votre profil.',
  'email-in-use-other-provider':
    'Un compte KUMP existe déjà avec cette adresse, mais avec un mot de passe — connectez-vous par email.',
  'provider-disabled': "Cette connexion n'est pas encore disponible.",
  'popup-blocked': 'Votre navigateur a bloqué la fenêtre de connexion.',
  'not-signed-in': 'Compte indisponible, rechargez la page.',
  'not-ready': 'Le compte KUMP est indisponible pour le moment.',
  'invalid-length': 'Le pseudo doit faire entre 3 et 16 caractères.',
};
const messageErreur = (code) => ERREURS[code] ?? 'Une erreur est survenue, réessayez.';

let overlay = null;
let unwatch = null;
let declencheur = null;
// Vue actuellement affichée ('invite' | 'profil'). Sert à NE PAS reconstruire
// l'écran quand l'identité change sans changer de vue — voir le piège dans
// `openAccount()`.
let vue = null;

/** Ferme l'écran et rend le focus au bouton qui l'a ouvert. */
function fermer() {
  if (!overlay) return;
  unwatch?.();
  unwatch = null;
  vue = null;
  overlay.remove();
  overlay = null;
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', surEchap);
  declencheur?.focus();
  declencheur = null;
}

function surEchap(event) {
  if (event.key === 'Escape') fermer();
}

/**
 * Ouvre l'écran de compte.
 * @param {{ onChange?: () => void }} [options] appelé quand l'identité change,
 *   pour que l'accueil rafraîchisse son bouton.
 */
export function openAccount({ onChange } = {}) {
  if (overlay) return;
  declencheur = document.activeElement;

  const contenu = el('div', { class: 'account-body' });
  const carte = el('div', {
      class: 'account-card',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Compte KUMP',
      tabindex: '-1',
    },
    el('button', { class: 'account-close', 'aria-label': 'Fermer', onclick: fermer }, '×'),
    el('h2', { class: 'account-title' }, 'Compte KUMP'),
    contenu,
  );

  overlay = el('div', {
    class: 'account-overlay',
    onclick: (event) => { if (event.target === overlay) fermer(); },
  }, carte);

  document.body.append(overlay);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', surEchap);
  carte.focus();

  rendreChargement(contenu);

  // On OBSERVE l'identité, on ne la force pas. Le callback part une première
  // fois dès que Firebase a fini de restaurer la session (ou avec `null`).
  //
  // ⚠️ PIÈGE, corrigé après l'avoir vu à l'écran : ce callback se déclenche
  // AUSSI au milieu d'une création de compte. « Créer mon compte » appelle
  // d'abord `ensureSignedIn()` (il faut un compte anonyme à rattacher), ce qui
  // fait passer l'utilisateur de `null` à anonyme — et reconstruire l'écran à
  // ce moment-là VIDAIT le formulaire que le joueur venait de remplir, et
  // effaçait le message d'erreur au passage. Symptôme observé : un mot de
  // passe trop court ne produisait aucun message, l'écran se contentait de se
  // réinitialiser en silence.
  //
  // On ne reconstruit donc que si la VUE change réellement (invité ↔ profil).
  // Passer de « aucun compte » à « compte anonyme » reste la vue invité : il
  // n'y a rien à redessiner.
  unwatch = kump.watchAccount((user) => {
    onChange?.();
    const cible = user && !user.isAnonymous ? 'profil' : 'invite';
    if (cible === vue) return;
    vue = cible;
    if (cible === 'profil') rendreProfil(contenu, { onChange });
    else rendreInvite(contenu, { onChange, connecte: Boolean(user) });
  });
}

function rendreChargement(contenu) {
  contenu.replaceChildren(el('p', { class: 'account-loading' }, 'Chargement…'));
}

// --- Invité : créer un compte, ou se connecter -----------------------------

/**
 * Bascule explicitement vers le profil après une identification réussie.
 *
 * ⚠️ INDISPENSABLE, et pas une ceinture-bretelles : `onAuthStateChanged` ne se
 * déclenche PAS lors d'un `link*`. Rattacher un email à un compte anonyme n'en
 * change pas l'identifiant — pour Firebase, l'utilisateur connecté est le
 * même, seuls ses fournisseurs ont changé. Le joueur voyait donc son compte se
 * créer sans que l'écran ne bouge, comme si rien ne s'était passé.
 * (Une connexion `signIn*`, elle, déclenche bien l'événement ; on force dans
 * les deux cas plutôt que d'avoir à se souvenir de la différence.)
 */
function allerAuProfil(contenu, callbacks) {
  vue = 'profil';
  rendreProfil(contenu, callbacks);
}

function rendreInvite(contenu, { onChange, connecte }) {
  let mode = 'creation'; // « créer » d'abord : c'est le cas courant (voir plus bas)

  const message = el('p', { class: 'account-error', role: 'alert', hidden: true });
  const email = el('input', { type: 'email', id: 'kump-email', autocomplete: 'email', placeholder: 'vous@exemple.fr' });
  const motDePasse = el('input', { type: 'password', id: 'kump-password', autocomplete: 'current-password', placeholder: '6 caractères minimum' });
  const valider = el('button', { class: 'btn btn-primary btn-big' });
  const bascule = el('button', { class: 'btn btn-ghost btn-small' });
  const explication = el('p', { class: 'account-note' });

  const google = el('button', {
    class: 'btn btn-big',
    onclick: async () => {
      const resultat = await kump.createAccountWithGoogle();
      if (resultat.success) {
        toast('Compte Google rattaché.');
        onChange?.();
        return allerAuProfil(contenu, { onChange });
      }
      if (resultat.error === 'credential-in-use') return proposerConnexionGoogle();
      afficherErreur(resultat.error);
    },
  }, 'Continuer avec Google');

  // Masqué tant que le rattachement n'a pas buté sur une identité déjà prise :
  // proposer « me connecter » d'emblée pousserait au geste destructeur.
  const reprise = el('div', { class: 'account-reprise', hidden: true },
    el('p', { class: 'account-note' },
      'Vous connecter récupérera ce profil et tout ce qu’il contient. En revanche, les parties jouées ici sans compte ne seront pas reprises.'),
    el('button', {
      class: 'btn btn-big',
      onclick: async () => {
        const resultat = await kump.loginWithGoogle();
        if (!resultat.success) return afficherErreur(resultat.error);
        toast('Content de vous revoir !');
        onChange?.();
        allerAuProfil(contenu, { onChange });
      },
    }, 'Me connecter avec ce compte Google'));

  function afficherErreur(code) {
    // Fermer la fenêtre Google n'est PAS une erreur : ne rien afficher.
    if (code === 'cancelled') return;
    message.textContent = messageErreur(code);
    message.classList.remove('info');
    message.hidden = false;
    reprise.hidden = true;
  }

  /**
   * Le compte Google visé appartient déjà à un AUTRE profil KUMP.
   *
   * C'est le cas le PLUS FRÉQUENT dès qu'un joueur a déjà un compte créé
   * depuis un autre jeu KUMP — et le laisser sur « ce compte est déjà
   * rattaché » sans rien proposer était une impasse : il n'avait aucun moyen
   * de récupérer son profil. On lui propose donc de s'y connecter, en disant
   * franchement ce que ça coûte.
   */
  function proposerConnexionGoogle() {
    message.textContent =
      'Ce compte Google appartient déjà à un profil KUMP — sans doute le vôtre, créé depuis un autre jeu.';
    // Ton NEUTRE, pas rouge : ce n'est pas un échec, c'est une situation qui a
    // une issue, proposée juste en dessous. Un bandeau d'erreur alarmerait
    // pour rien.
    message.classList.add('info');
    message.hidden = false;
    reprise.hidden = false;
    // La sortie est plus bas que le pli de la carte : sans ça, le joueur voit
    // un message rouge et rien d'autre, et croit être bloqué.
    reprise.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function appliquerMode() {
    message.hidden = true;
    message.classList.remove('info');
    reprise.hidden = true;
    const creation = mode === 'creation';
    valider.textContent = creation ? 'Créer mon compte' : 'Me connecter';
    bascule.textContent = creation ? "J'ai déjà un compte" : 'Créer un compte à la place';
    motDePasse.setAttribute('autocomplete', creation ? 'new-password' : 'current-password');
    // La différence entre les deux n'est PAS cosmétique et le joueur doit la
    // comprendre AVANT de cliquer : créer rattache ses parties actuelles,
    // se connecter bascule sur un autre compte et les abandonne.
    explication.textContent = creation
      ? connecte
        ? 'Vos parties déjà jouées sur cet appareil seront rattachées à ce compte — rien n’est perdu.'
        : 'Votre compte vous suivra sur vos autres appareils, et sur vos autres jeux KUMP.'
      : 'Attention : vous retrouverez les parties de CE compte. Celles jouées ici sans compte ne seront pas reprises.';
  }

  async function envoyer() {
    const mail = email.value.trim();
    const mdp = motDePasse.value;
    if (!mail || !mdp) return afficherErreur('invalid-email');

    valider.disabled = true;
    valider.textContent = 'Un instant…';
    const resultat = mode === 'creation'
      ? await kump.createAccount(mail, mdp)
      : await kump.loginToAccount(mail, mdp);
    valider.disabled = false;
    appliquerMode();

    if (!resultat.success) return afficherErreur(resultat.error);
    toast(mode === 'creation' ? 'Compte créé — vos parties sont sauvegardées.' : 'Content de vous revoir !');
    onChange?.();
    allerAuProfil(contenu, { onChange });
  }

  contenu.replaceChildren(
    el('p', { class: 'account-intro' },
      'Un seul compte pour tous les jeux KUMP : vos parties, votre temps de jeu et vos trophées vous suivent d’un appareil à l’autre.'),
    message,
    el('label', { for: 'kump-email' }, 'Email'),
    email,
    el('label', { for: 'kump-password' }, 'Mot de passe'),
    motDePasse,
    valider,
    explication,
    el('div', { class: 'account-sep' }, 'ou'),
    google,
    reprise,
    el('div', { class: 'account-switch' }, bascule),
  );

  valider.addEventListener('click', envoyer);
  motDePasse.addEventListener('keydown', (e) => { if (e.key === 'Enter') envoyer(); });
  bascule.addEventListener('click', () => {
    mode = mode === 'creation' ? 'connexion' : 'creation';
    appliquerMode();
  });
  appliquerMode();
}

// --- Connecté : le profil --------------------------------------------------

function formatDuree(ms) {
  // « — » seulement quand il n'y a VRAIMENT rien : afficher un tiret pour une
  // partie de 40 secondes donnait l'impression que le temps de jeu n'était pas
  // enregistré, alors qu'il l'était.
  if (!ms || ms < 1000) return '—';
  if (ms < 60000) return `${Math.round(ms / 1000)} s`;
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes} min`;
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  return reste === 0 ? `${heures} h` : `${heures} h ${reste}`;
}

function tuile(valeur, libelle) {
  return el('div', { class: 'account-tile' },
    el('strong', {}, String(valeur)),
    el('span', {}, libelle));
}

async function rendreProfil(contenu, { onChange }) {
  rendreChargement(contenu);

  // Les quatre lectures partent ensemble : séquentiellement, l'écran resterait
  // sur « Chargement… » le temps de quatre allers-retours Firestore.
  const [profil, donnees, trophees, catalogue] = await Promise.all([
    kump.getProfile(),
    kump.loadGameData(),
    kump.getUnlockedTrophies(),
    // Libellés lisibles des trophées : ils vivent en base (`games/d-track`),
    // pas dans ce fichier — le jeu et kump.fr lisent ainsi la même source.
    kump.getGameCatalog(),
  ]);
  if (!overlay) return; // l'écran a été fermé pendant le chargement
  if (!profil) {
    contenu.replaceChildren(el('p', { class: 'account-error' }, 'Profil indisponible. Réessayez plus tard.'));
    return;
  }

  setKumpName(profil.displayName);
  onChange?.();

  const stats = donnees ?? {};
  const obtenus = new Set(trophees.map((t) => t.id));
  // Un catalogue absent ne doit jamais donner un écran vide : on retombe sur
  // les identifiants bruts des trophées réellement obtenus.
  const listeTrophees = catalogue?.trophies?.length
    ? catalogue.trophies
    : trophees.map((t) => ({ id: t.id, label: t.id, description: '' }));

  const pseudo = el('input', { type: 'text', id: 'kump-name', maxlength: '16', value: profil.displayName });

  contenu.replaceChildren(
    el('div', { class: 'account-identity' },
      el('div', { class: 'account-avatar', 'aria-hidden': 'true' }, profil.displayName.slice(0, 1).toUpperCase()),
      el('div', {},
        el('strong', {}, profil.displayName),
        el('span', { class: 'account-email' }, profil.email ?? 'Compte Google'))),

    el('div', { class: 'account-tiles' },
      tuile(stats.gamesPlayed ?? 0, 'Parties'),
      tuile(stats.bestScore ?? '—', 'Meilleur score'),
      tuile(stats.onlineWins ?? 0, 'Victoires en ligne'),
      tuile(formatDuree(profil.totalPlaytimeMs), 'Temps de jeu (tous jeux)')),

    el('h3', { class: 'account-subtitle' }, `Trophées ${obtenus.size} / ${listeTrophees.length}`),
    el('div', { class: 'account-trophies' },
      listeTrophees.map((trophee) => el('span', {
        class: `account-trophy ${obtenus.has(trophee.id) ? 'won' : 'locked'}`,
        title: trophee.description || trophee.label,
      }, trophee.label))),

    el('h3', { class: 'account-subtitle' }, 'Pseudo'),
    el('div', { class: 'account-rename' },
      pseudo,
      el('button', {
        class: 'btn btn-small',
        onclick: async () => {
          const resultat = await kump.setDisplayName(pseudo.value);
          if (!resultat.success) return toast(messageErreur(resultat.error));
          setKumpName(pseudo.value.trim());
          onChange?.();
          toast('Pseudo mis à jour.');
        },
      }, 'Changer')),

    el('p', { class: 'account-note' },
      'Retrouvez tous vos jeux KUMP sur ',
      el('a', { href: 'https://kump.fr/profil', target: '_blank', rel: 'noopener' }, 'kump.fr/profil'),
      '.'),

    el('button', {
      class: 'btn btn-ghost btn-small account-logout',
      onclick: async () => {
        await kump.logoutAccount();
        setKumpName(null);
        onChange?.();
        toast('Déconnecté.');
        fermer();
      },
    }, 'Se déconnecter'),
  );
}
