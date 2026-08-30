// Configuration du compte KUMP, SANS importer le module ni le SDK Firebase.
//
// Même raison d'être que `utils/kumpConfig.js` dans Androgame : un
// `import { ... } from 'kump-account'` tire tout le SDK Firebase (~150 Ko
// gzip) dans le chunk du fichier qui l'importe. Or D-Track promet un mode
// solo 100 % hors ligne et léger — le SDK n'a rien à faire dans le chunk de
// démarrage ni dans celui de l'écran de jeu.
//
// Ce fichier ne lit que des variables d'environnement, résolues au build : il
// ne coûte rien et peut être importé statiquement n'importe où.

export const kumpFirebaseConfig = {
  apiKey: import.meta.env.VITE_KUMP_API_KEY,
  authDomain: import.meta.env.VITE_KUMP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_KUMP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_KUMP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_KUMP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_KUMP_APP_ID,
};

/** URL du serveur de validation des parties (routes /api/game/* de kump.fr). */
export const kumpApiBaseUrl = import.meta.env.VITE_KUMP_API_URL;

/** `true` si le compte KUMP est configuré sur cette build. */
export const isKumpConfigured = Object.values(kumpFirebaseConfig).every(Boolean);
