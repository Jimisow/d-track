# D-Track

## À LIRE AVANT DE COMMENCER

> ⚠️ **[EXPLOITATION.md](EXPLOITATION.md) — à lire en premier.** Comment lancer
> les serveurs, sur quels ports, comment vérifier et comment déployer. Et une
> règle qui change la façon de travailler : **c'est l'assistant qui lance les
> commandes, jamais l'utilisateur.**


Jeu de dés **roll & write** (1 à 6 joueurs), PWA. Solo 100 % hors ligne,
multijoueur temps réel via Firestore. Depuis le 2026-08-29, il est aussi
branché sur le **compte joueur KUMP**, partagé avec les autres jeux du studio.

Il fait donc partie d'un ensemble de dépôts qui évoluent ensemble :

| Dépôt | Rôle |
|---|---|
| **D-Track** (ici) | le jeu |
| **kump-account** (`E:\Projet\kump-account`, [GitHub](https://github.com/Jimisow/kump-account)) | le compte joueur partagé — le jeu n'écrit aucune ligne de Firebase KUMP directement |
| **kump.fr** (`E:\Projet\Kump.fr`) | serveur de validation des parties, profil joueur, panel admin |
| **Androgame**, **Assassins** | les autres jeux branchés sur le même compte |

**Une modification de `kump-account` touche D-Track ET les autres jeux ET le
site** : tous installent la branche `main`, sans version épinglée.

### ⚠️ DEUX projets Firebase, à ne jamais confondre

| Projet | Contient | Configuré dans |
|---|---|---|
| `d-tack-37281` | les **salons multijoueur** (`games/{code}`) | `src/net/firebase.js`, en dur |
| `kump-812dd` | le **compte joueur** (identité, stats, trophées) | `src/net/kumpConfig.js`, via `.env` |

Ils cohabitent sans conflit : `initKump()` crée une app Firebase **nommée
« kump »** à côté de l'app par défaut du jeu. Deux bases, deux jeux de règles,
deux sessions anonymes distinctes. **Ne jamais tenter de les fusionner** — et
ne jamais supposer que le serveur de kump.fr peut lire une partie en ligne :
il n'a aucun accès à `d-tack-37281` (voir « victoire déclarée » plus bas).

### Les règles de travail sur ce projet

- **Lancer les serveurs et déployer, c'est L'ASSISTANT.** L'utilisateur ne
  tape jamais de commande — il décide, il ne s'exécute pas. Ne jamais écrire
  « lance `npm run dev` et dis-moi » ni laisser une étape « à faire de ton
  côté » : lancer, regarder, capturer, rapporter. Détail des commandes et des
  ports dans [EXPLOITATION.md](EXPLOITATION.md).
1. **Tenir ce fichier à jour, systématiquement.** C'est la mémoire du projet :
   chaque session part de ce qui est écrit ici. Une décision structurante, un
   piège rencontré, un changement d'architecture se documentent **dans le même
   passage** que le code — pas « plus tard ». Un `CLAUDE.md` périmé est pire
   que pas de documentation : il fait partir la session suivante sur des
   informations fausses.
2. **Documenter le POURQUOI, pas le QUOI.** Le code dit déjà ce qu'il fait. Ce
   qui se perd, c'est la raison d'un choix et le piège déjà payé une fois.
3. **Vérifier en conditions réelles, jamais « ça compile ».** Jouer une vraie
   partie, regarder l'écran. Trois bugs de la session d'intégration KUMP ne se
   voyaient qu'en jouant (voir plus bas) — aucun n'aurait été trouvé en
   relisant le code.
4. **Actions sensibles : demander avant.** Déploiement, écriture dans une base
   de production, suppression de données.
5. **Rapporter fidèlement.** Si un test échoue, le dire avec sa sortie.

## Stack

- **Vite 6**, JavaScript vanilla, **zéro framework**.
- `firebase` v11 (multijoueur) + `kump-account` (compte joueur).
- `vite-plugin-pwa` (service worker, installation), `vitest` (tests unitaires).
- Déploiement : GitHub Pages via `npm run deploy`, domaine `dtrack.kump.fr`.

## Commandes

```bash
npm run dev            # http://localhost:5173
npm test               # Vitest : scoring + grille (44 tests)
npm run build          # dist/ + service worker
npm run export:rules   # ⚠️ copie les règles du jeu vers kump.fr — voir plus bas
npm run deploy         # build + publication sur gh-pages
```

## Architecture

Voir `README.md` pour l'arborescence détaillée et les règles du jeu. Les
fichiers de `src/game/` sont **purs** (aucun DOM) et testés — c'est ce qui
permet au serveur de validation de les exécuter lui aussi.

## Compte KUMP

### Ce qui est branché

- **`src/net/kumpConfig.js`** — la configuration (variables d'env), et RIEN
  d'autre. Importable statiquement partout : il ne coûte rien.
- **`src/net/kumpBridge.js`** — `sendToKump()`, point d'entrée paresseux pour
  l'enregistrement d'une partie.
- **`src/ui/accountButton.js`** — le bouton de l'accueil, paresseux lui aussi.
- **`src/net/kump.js`** — l'adaptateur réel (importe `kump-account`, donc
  Firebase). **Jamais importé statiquement.**
- **`src/ui/account.js`** — l'écran connexion / profil.

### ⚠️ Le découpage paresseux n'est pas décoratif

D-Track promet un solo **100 % hors ligne et léger**. Le SDK Firebase pèse
~470 Ko. Un seul `import` statique de `kump-account` (ou de `net/kump.js`, ou
de `ui/account.js`) où que ce soit le fait retomber dans le chunk de
démarrage et annule cette promesse.

Repère chiffré à vérifier après toute modification : `npm run build` doit
laisser `assets/index-*.js` autour de **30 Ko**, et `index.esm2017-*.js`
(Firebase) dans un chunk séparé. S'il passe à ~480 Ko, un import statique
s'est glissé quelque part.

### Le serveur REJOUE la partie, il ne croit pas le score

Le jeu n'envoie pas son score : il envoie le symbole de départ, la séquence
des 12 lancers et **l'ordre exact des 24 placements**. kump.fr rejoue la
partie avec les mêmes règles pures et refuse au premier placement illégal.

C'est pour ça que `gameScreen.js` capture `dieChoice` **avant** de le remettre
à `null` et transmet `moves` (`{ cell, die }`) dans `onCommit` : la grille
finale seule ne dirait rien de l'ORDRE, dont dépend la légalité de chaque
placement (règle d'adjacence).

⚠️ **`npm run export:rules` après TOUTE modification de `src/game/*.js`**
(barème, grille, dés). Le script copie ces fichiers dans kump.fr, qui juge
avec sa copie — **puis il faut committer ET déployer kump.fr**. Une copie
périmée ne fait pas refuser les tricheurs : elle fait refuser les parties
**honnêtes**. Même discipline que `export:bounds` dans Androgame.

### Ce que l'anti-triche couvre, et ce qu'il ne couvre pas

À dire tel quel, sans l'enjoliver :

- **Un score annoncé n'est jamais cru** — il est recalculé.
- **Mais en solo, les dés sont tirés par le client.** Un tricheur peut
  fabriquer une séquence parfaite et la grille qui va avec : la partie sera
  jugée cohérente, parce qu'elle l'est. Son plafond est le maximum théorique
  du jeu (120 points, grille monochrome), pas l'infini. **C'est précisément
  pour ça qu'aucun classement D-Track n'est publié** : un meilleur score sert
  à se situer soi-même, pas à arbitrer une compétition. Ne pas ouvrir de
  classement sans faire d'abord venir les dés du serveur.
- **La victoire en ligne est DÉCLARÉE.** kump.fr n'a aucun accès à
  `d-tack-37281`. Elle est calculée avec la même fonction que l'écran de
  résultats (`rankPlayers`) pour qu'un joueur ne puisse pas voir « 2e » à
  l'écran et « victoire » sur son profil — mais elle reste invérifiable.

### Boutique et économie (2026-08-30)

D-Track gagne des **jetons** à chaque partie et a une boutique. Deux choses à
savoir avant d'y toucher :

- **Le barème et les prix vivent dans kump.fr**, pas ici :
  `src/lib/game/shops/dtrack.ts`. Le jeu n'écrit aucun prix — c'est ce qui rend
  impossible d'en annoncer un faux.
- **L'écran de boutique vient du module** (`kump-account/ui`), pas de ce dépôt.
  `src/ui/accountButton.js > openShopScreen()` ne fait que lui donner les
  couleurs de D-Track, lues à l'exécution depuis les tokens de `styles.css` —
  le thème clair/sombre s'y applique donc tout seul.

**Pour ajouter un objet** : une ligne dans `shops/dtrack.ts` côté kump.fr, puis
l'implémenter ici (lire `equippedTheme` / `equippedDice` dans les données du
joueur et appliquer l'apparence). Rien d'autre.

⚠️ **Équiper passe par le serveur**, comme acheter : les règles Firestore
n'autorisent le client à écrire que `equippedSkin`/`equippedTrail` (hérités
d'Androgame). `equipItem()` est le même appel que `buyItem()`, sans débit.

⚠️ **Le score payé est le score RECALCULÉ par le serveur**, pas celui affiché à
l'écran — ils coïncident parce que le serveur rejoue la partie. Un score
négatif ne retire jamais de jetons.

### Pièges déjà rencontrés (ne pas les défaire)

- **Une partie reprise après un rafraîchissement n'est pas enregistrée.**
  `board.reset()` restaure la grille depuis Firestore, mais pas l'ordre des
  placements. Envoyer une trace incomplète ferait refuser la partie
  (`moves-invalid`) : mieux vaut ne rien envoyer que de fabriquer une erreur.
  Le symbole de départ et les dés, eux, survivent (ils viennent de Firestore).
- **La trace repart à zéro dans `handlePlaying`, pas dans la branche
  « lobby ».** Une revanche (`net.rematch()`) repasse le salon en `lobby` puis
  en `playing` : réinitialiser au mauvais endroit ajoutait les placements de
  la partie précédente à ceux de la nouvelle, et le serveur refusait les deux.
  C'est aussi ce qui fait que la durée mesurée part du vrai début de la
  partie, sans compter l'attente dans le salon.
- **Ouvrir l'écran de compte ne doit créer AUCUN compte.** `watchAccount()`
  observe l'identité ; `ensureSignedIn()` en CRÉE une. Utiliser la seconde
  pour « savoir qui est connecté » fabriquerait un compte anonyme fantôme à
  chaque coup d'œil. Un compte n'est créé qu'à la première partie TERMINÉE, ou
  quand le joueur crée réellement son compte.
- **`onAuthStateChanged` ne se déclenche PAS lors d'un `link*`.** Rattacher un
  email à un compte anonyme n'en change pas l'identifiant : pour Firebase,
  c'est le même utilisateur. `ui/account.js` bascule donc explicitement vers
  le profil (`allerAuProfil`) après une identification réussie. Sans ça, le
  joueur créait son compte et l'écran ne bougeait pas.
- **Ne pas reconstruire l'écran de compte à chaque événement d'identité.**
  « Créer mon compte » appelle d'abord `ensureSignedIn()` : l'utilisateur
  passe de `null` à anonyme *au milieu de la saisie*. Redessiner à ce
  moment-là **vidait le formulaire et effaçait le message d'erreur**. On ne
  redessine que si la VUE change (invité ↔ profil).
- **« Ce compte Google est déjà pris » n'est pas une impasse.** C'est même le
  cas le PLUS FRÉQUENT : le joueur a déjà un profil KUMP créé depuis un autre
  jeu, Firebase refuse donc de rattacher une identité déjà prise
  (`credential-in-use`). L'écran propose alors « Me connecter avec ce compte
  Google » (`loginWithGoogle`), en disant franchement ce que ça coûte — la
  session anonyme en cours est abandonnée. Ne jamais revenir à un simple
  message d'erreur sans issue. Le bandeau prend un ton neutre
  (`.account-error.info`) et le bloc défile jusqu'à la vue : il est plus bas
  que le pli de la carte.
- **`cancelled` n'est PAS une erreur.** Le joueur a fermé la fenêtre Google.
  Sans traitement explicite, l'écran affiche « une erreur est survenue ».
- **Les avertissements `Cross-Origin-Opener-Policy` en console sont du bruit
  connu** du SDK Firebase, qui sonde `window.closed` sur sa popup. Ils
  apparaissent même quand la connexion réussit — ne pas partir en chasse.
- **`link*` et jamais `signIn*` pour créer un compte.** Le joueur a déjà des
  parties enregistrées sur son compte anonyme ; `link*` les garde, `signIn*`
  les abandonne. Les deux existent séparément dans le module précisément pour
  rendre l'erreur impossible par distraction. `loginToAccount()` utilise bien
  `signIn*`, et l'écran prévient explicitement le joueur avant.
- **Ne jamais écrire dans Firestore KUMP depuis le jeu.** Les règles refusent
  au client d'écrire temps de jeu, statistiques et trophées, **et le refus est
  SILENCIEUX** (le module avale l'erreur et renvoie `false`). `saveGameData()`,
  `addPlaytime()` et `unlockTrophy()` ne fonctionnent plus. La seule voie est
  `submitSession()`.
- **`storage.js` reste la source de vérité de l'affichage local.** Meilleur
  score et historique à l'écran viennent toujours du `localStorage` : le
  compte est un plus, jamais une condition pour jouer.

### Développement local du module

`kump-account` est installé depuis GitHub en temps normal :

```bash
npm install github:Jimisow/kump-account
```

Pour travailler sur le module et le jeu en même temps :

```bash
npm install file:../kump-account --install-links
```

⚠️ **`--install-links` est obligatoire.** Sans lui, npm pose un lien
symbolique vers un dossier hors du projet, et Rollup échoue au build avec
`Rollup failed to resolve import "firebase/app"` — il cherche `firebase` dans
`kump-account/node_modules`, qui n'existe pas.

⚠️ **npm réutilise son cache tant que la version du module ne change pas** :
une fonction ajoutée à `kump-account` restera introuvable après réinstallation
(« does not provide an export named … ») jusqu'à ce que sa version soit
incrémentée, ou que `node_modules/kump-account` soit supprimé à la main.
Penser aussi à `rm -rf node_modules/.vite`.

**Avant de pousser : remettre `"kump-account": "github:Jimisow/kump-account"`
dans `package.json`.** Un chemin `file:` ne veut rien dire en CI.

### Libellés des trophées : en base, pas dans le code

Les noms lisibles (« Premier lancer », « Stratège »…) vivent dans le document
Firestore `games/d-track`, lu par `getGameCatalog()`. Le jeu et kump.fr lisent
donc la MÊME source — un libellé réécrit n'a besoin d'aucun déploiement.

Le catalogue s'écrit depuis kump.fr : `node scripts/seed-game-catalog.cjs --write`.

⚠️ Les **identifiants** de trophée sont définitifs (un trophée obtenu par un
joueur y est rattaché) et doivent correspondre exactement à ceux attribués par
le serveur (`Kump.fr/src/lib/game/games/dtrack.ts`). Les **libellés** sont
libres.

Un catalogue absent ne casse rien : l'écran retombe sur les identifiants
bruts plutôt que d'afficher une liste vide.

## Variables d'environnement

`.env` (hors git) : `VITE_KUMP_API_KEY`, `VITE_KUMP_AUTH_DOMAIN`,
`VITE_KUMP_PROJECT_ID`, `VITE_KUMP_STORAGE_BUCKET`,
`VITE_KUMP_MESSAGING_SENDER_ID`, `VITE_KUMP_APP_ID` — identifiants Firebase
**publics** de `kump-812dd`, exposés au navigateur comme dans chaque jeu
(la sécurité repose sur les règles Firestore, pas sur leur secret).

`VITE_KUMP_API_URL` — l'URL du serveur de validation :
`http://localhost:3000` en développement, l'URL de kump.fr en production.

⚠️ **`npm run deploy` construit avec le `.env` LOCAL.** Publier sans changer
cette URL enverrait chaque joueur appeler un serveur qui n'existe que sur la
machine du développeur — et **sans la moindre erreur visible**, puisque les
parties partiraient en file d'attente locale (comportement voulu pour le joueur
hors ligne). Personne ne s'en apercevrait avant des semaines.

C'est pour ça que `predeploy` lance `scripts/check-deploy.js`, qui **refuse de
déployer** si l'URL contient `localhost`. Ne pas le retirer du `predeploy` :
c'est le seul garde-fou contre une panne totalement silencieuse.

Sans ces variables, D-Track fonctionne exactement comme avant : le module
reste inactif, le bouton « Compte » est masqué, le jeu tourne sur son
`localStorage`.

## État de vérification (2026-08-29)

**Vérifié en conditions réelles** (navigateur, parcours complet) : partie solo
enregistrée, score recalculé identique à l'écran, création de compte,
affichage du profil, trophée débloqué, persistance de la session après
rechargement, refus des six formes de falsification testées.

**Non vérifié** : le mode **en ligne** (il demande deux navigateurs et une
partie réelle à plusieurs) et la connexion **Google** (elle ouvre une popup).
Le code suit le même chemin que le solo, mais il n'a pas été vu tourner.
