// Amis KUMP dans D-Track (module `kump-account/social`) : bouton « Amis » de l'accueil, présence (« En ligne · D-Track »,
// « En partie »), chat, et INVITATIONS — dans un salon D-Track, ou reçues d'un autre jeu KUMP (la carte propose de changer de jeu).
//
// Comme net/kump.js : jamais importé statiquement par l'écran de démarrage. `main.js` n'importe que `isSocialMember` /
// `initFriends` (ce fichier ne contient que des `import()`), le module et le SDK Realtime Database arrivent au premier besoin.
//
// ⚠️ Compte RÉEL uniquement (email ou Google) : un invité n'a pas d'amis — rien n'est créé pour lui.
// ⚠️ Aucun `import 'firebase/*'` ici : c'est le module qui parle à Firebase (règle d'or de l'écosystème KUMP).

/** Adresse publique de D-Track : c'est elle qu'on envoie aux amis (jamais `localhost`, inutilisable chez eux). */
const PUBLIC_URL = 'https://dtrack.kump.fr/';
const GAME_NAME = 'D-Track';
const MEMBER_KEY = 'kump.socialMember'; // = SOCIAL_MEMBER_KEY du module, lu sans le charger

let controller = null;
let starting = null;
let badge = () => {};
let status = 'menu';
let panel = null; // panneau ouvert par le bouton « Amis » (fermé après une invitation, pour laisser voir le salon)

/** Un compte réel utilise-t-il déjà les amis sur cet appareil ? (lecture locale, aucun réseau) */
export function isSocialMember() {
  try {
    return localStorage.getItem(MEMBER_KEY) === '1';
  } catch {
    return false;
  }
}

async function load() {
  const kump = await import('./kump.js');
  if (!kump.startKump()) return null; // initKump (config avec `databaseURL`) ; sans config KUMP sur cette build : rien
  const [social, ui, { themeKump }] = await Promise.all([import('kump-account/social'), import('kump-account/ui'), import('../ui/accountButton.js')]);
  ui.applyKumpTheme(themeKump()); // mêmes couleurs que la boutique (tokens du thème clair/sombre de D-Track)
  return social;
}

/** Ouvrir l'adresse d'invitation : en développement, le même serveur ; sinon l'adresse publique. */
function baseUrl() {
  return ['localhost', '127.0.0.1'].includes(location.hostname) ? `${location.origin}/` : PUBLIC_URL;
}

/**
 * « Inviter » : dans le salon en cours s'il y en a un, sinon on en crée un (pseudo D-Track, ou celui du compte KUMP), puis on
 * envoie à l'ami l'adresse `?join=CODE` — il arrive directement dans le salon.
 */
async function inviteToLobby(social, friend) {
  const flow = await import('../ui/onlineFlow.js');
  let code = flow.currentLobbyCode();
  if (!code) {
    const [{ getPlayerName, setPlayerName }, kump] = await Promise.all([import('../storage.js'), import('./kump.js')]);
    const name = getPlayerName() || (await kump.getProfile().catch(() => null))?.displayName || 'Joueur';
    setPlayerName(name);
    await flow.createOnline(name); // affiche le salon
    code = flow.currentLobbyCode();
  }
  await social.sendInvite(friend.uid, { url: `${baseUrl()}?join=${encodeURIComponent(code)}`, gameName: GAME_NAME });
  panel?.close();
  (await import('../ui/dom.js')).toast(`Invitation envoyée à ${friend.name} : il rejoindra ce salon.`);
}

/**
 * Démarre la présence et l'écoute des invitations (une fois). Sans effet pour un invité.
 * @param {{onBadge?: (n: number) => void, onAccount?: () => void}} [opts]
 */
export function startFriends(opts = {}) {
  if (opts.onBadge) badge = opts.onBadge;
  if (controller) return Promise.resolve(controller);
  starting ??= (async () => {
    try {
      const social = await load();
      if (!social) return null;
      controller = await social.startKumpSocial({
        gameName: GAME_NAME,
        status,
        onBadge: (n) => badge(n),
        friendsOptions: () => friendsOptions(social, opts),
      });
      return controller;
    } catch (err) {
      console.warn('[social] amis indisponibles :', err?.message ?? err);
      return null;
    } finally {
      starting = null;
    }
  })();
  return starting;
}

function friendsOptions(social, opts) {
  return { gameName: GAME_NAME, onAccount: opts.onAccount, onInvite: (friend) => inviteToLobby(social, friend) };
}

/** Bouton « Amis » : ouvre le panneau (et démarre la présence s'il le faut). Renvoie `null` si le compte est injoignable. */
export async function openFriends(opts = {}) {
  const social = await load();
  if (!social) return null;
  await startFriends(opts);
  panel = social.openKumpFriends({ ...friendsOptions(social, opts), onClose: () => (panel = null) });
  return panel;
}

// « En partie » pendant une partie (solo ou en ligne), « menu » ailleurs — d'après l'écran affiché (ui/dom.js > showScreen).
document.addEventListener('dtrack:screen', (e) => {
  status = e.detail === 'game' ? 'playing' : 'menu';
  controller?.setStatus(status);
});
