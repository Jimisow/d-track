// Garde-fou avant publication : refuse de déployer une build qui pointe sur
// une URL de développement.
//
// POURQUOI CE SCRIPT EXISTE
//
// `npm run deploy` construit avec le fichier `.env` LOCAL, celui qui sert au
// développement — et il contient `VITE_KUMP_API_URL=http://localhost:3000`.
// Publier tel quel envoie chaque joueur appeler un serveur qui n'existe que
// sur MA machine.
//
// Et le symptôme serait invisible : le module met les parties en file d'attente
// locale quand le serveur est injoignable (c'est voulu, pour le joueur dans le
// métro). Personne ne verrait d'erreur. Les parties ne seraient simplement
// jamais enregistrées, chez tout le monde, jusqu'à ce que quelqu'un s'en
// aperçoive des semaines plus tard.
//
// Une minute de script contre ce scénario-là, c'est donné.

// Module ES : `package.json` du projet porte "type": "module", donc un `.js`
// est traité comme tel — `require` y lève, et `__dirname` n'existe pas.
import fs from 'node:fs';

const envPath = new URL('../.env', import.meta.url);
if (!fs.existsSync(envPath)) {
  console.error(
    '\n[deploy] Aucun fichier .env — le compte KUMP serait DÉSACTIVÉ dans cette\n' +
      '         build : pas de bouton Compte, pas de boutique, aucune partie\n' +
      '         enregistrée. Voir CLAUDE.md > Variables d\'environnement.\n',
  );
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const url = /^VITE_KUMP_API_URL=(.*)$/m.exec(env)?.[1]?.trim() ?? '';

if (!url) {
  console.error(
    '\n[deploy] VITE_KUMP_API_URL est absente du .env.\n' +
      '         Les parties resteraient en file d\'attente locale sans jamais\n' +
      '         partir, sans le moindre message d\'erreur.\n',
  );
  process.exit(1);
}

if (/localhost|127\.0\.0\.1|\[::1\]/.test(url)) {
  console.error(
    `\n[deploy] VITE_KUMP_API_URL vaut « ${url} » : c'est l'URL de DÉVELOPPEMENT.\n` +
      '\n' +
      '         Publier cette build enverrait chaque joueur appeler un serveur\n' +
      '         qui n\'existe que sur cette machine. Aucune partie ne serait\n' +
      '         enregistrée — et SANS AUCUNE ERREUR VISIBLE, puisqu\'elles\n' +
      '         partiraient en file d\'attente locale.\n' +
      '\n' +
      '         Mettre l\'URL de production dans .env, puis relancer.\n',
  );
  process.exit(1);
}

console.log(`[deploy] VITE_KUMP_API_URL = ${url} — build de production autorisée.`);
