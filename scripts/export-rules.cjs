// Copie les règles PURES du jeu vers le serveur de validation (kump.fr).
//
// Pourquoi une copie plutôt qu'un import ?
// kump.fr est un dépôt séparé, déployé seul sur Vercel : il ne peut pas
// importer un fichier de ce dépôt-ci. Et ces quatre modules sont précisément
// ceux qui décident si une partie est légale et combien elle vaut — le
// serveur DOIT les exécuter lui-même, sinon il ne fait que croire le joueur.
//
// ⚠️ MÊME DISCIPLINE QUE `export:bounds` DANS ANDROGAME :
// après TOUTE modification du barème, de la grille ou des dés, relancer
//     npm run export:rules
// puis COMMITTER ET DÉPLOYER kump.fr. Sans ça, le serveur juge avec les
// anciennes règles — et ce sont les parties HONNÊTES qu'il refuse.
//
// La copie est VERBATIM (aucun en-tête ajouté) : c'est ce qui permet de
// détecter une dérive par simple comparaison. `SOURCE.md` enregistre
// l'empreinte de chaque fichier au moment de la copie.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILES = ['grid.js', 'scoring.js', 'dice.js', 'symbols.js'];

const from = path.join(__dirname, '..', 'src', 'game');
const to = path.join(__dirname, '..', '..', 'Kump.fr', 'src', 'lib', 'game', 'dtrack');

if (!fs.existsSync(path.join(__dirname, '..', '..', 'Kump.fr'))) {
  console.error('[export:rules] Dépôt kump.fr introuvable à côté de celui-ci — rien copié.');
  process.exit(1);
}

fs.mkdirSync(to, { recursive: true });

const lines = [];
for (const file of FILES) {
  const content = fs.readFileSync(path.join(from, file));
  fs.writeFileSync(path.join(to, file), content);
  const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
  lines.push(`| \`${file}\` | \`${hash}\` |`);
  console.log(`[export:rules] ${file} -> kump.fr (${hash})`);
}

fs.writeFileSync(
  path.join(to, 'SOURCE.md'),
  `# Règles de D-Track — COPIE, ne pas modifier ici

Ces fichiers sont une copie **verbatim** de \`D-Track/src/game/\`, produite par
\`npm run export:rules\` dans le dépôt D-Track. Le serveur de validation les
exécute pour **rejouer** une partie : il recalcule le score et vérifie la
légalité de chaque placement au lieu de croire le joueur.

**Ne jamais les éditer ici.** Une correction se fait dans D-Track, puis se
réexporte — sinon le serveur et le jeu ne suivent plus les mêmes règles, et le
serveur refuse des parties honnêtes.

Dernière copie : ${new Date().toISOString().slice(0, 10)}

| Fichier | Empreinte (sha256, 16 car.) |
|---|---|
${lines.join('\n')}
`,
);
console.log('[export:rules] SOURCE.md écrit. Penser à committer ET déployer kump.fr.');
