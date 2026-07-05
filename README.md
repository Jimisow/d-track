# 🎲 D-Track

🔗 **Jouer en ligne : [jimisow.github.io/d-track](https://jimisow.github.io/d-track/)**

Jeu de dés **roll & write** (1 à 6 joueurs) en Progressive Web App :

- **Solo** : 100 % hors-ligne (service worker), meilleur score et historique des 20 dernières parties en local.
- **Multijoueur en ligne** (2 à 6 joueurs) : salons avec code à 5 caractères, synchronisation temps réel via **Firebase Firestore**, jouable en 4G/Wi-Fi où que soient les joueurs.

## Commandes

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement (http://localhost:5173)
npm test           # tests unitaires (scoring + placement, Vitest)
npm run build      # build de production dans dist/ (+ service worker)
npm run preview    # servir le build de production en local
```

> ⚠️ Le service worker et l'installation PWA ne sont actifs que sur le **build de production** (`npm run build && npm run preview`), pas en `npm run dev`.

## ⚙️ Configuration Firebase (OBLIGATOIRE pour le multijoueur)

Le projet utilise la config Firebase intégrée (`src/net/firebase.js`, projet `d-tack-37281`). Dans la [console Firebase](https://console.firebase.google.com/) :

1. **Activer Firestore** : *Build → Firestore Database → Créer une base de données* (mode production).
2. **Activer l'authentification anonyme** : *Build → Authentication → Sign-in method → Anonyme → Activer*. Sans cela, les joueurs ne pourront ni créer ni rejoindre un salon.
3. **Publier les règles de sécurité** : copier le contenu de [`firestore.rules`](firestore.rules) dans *Firestore Database → Règles → Publier*.
   (Ou via la CLI : `firebase deploy --only firestore:rules`.)

Le mode solo fonctionne sans aucune de ces étapes.

## 🧪 Tester le multijoueur en local avec deux onglets

⚠️ L'authentification anonyme Firebase est **partagée par origine** : deux onglets normaux du même navigateur = le même joueur. Pour simuler deux joueurs :

1. `npm run dev` puis ouvrir <http://localhost:5173> dans un onglet **normal**.
2. Ouvrir un second onglet en **navigation privée** (ou un autre navigateur, ou un profil Chrome différent).
3. Onglet 1 : **Créer une partie** → choisir un pseudo → noter le code (ex. `K7XPM`).
4. Onglet 2 : **Rejoindre** → saisir le code + un autre pseudo.
5. Dans chaque onglet : appuyer sur **« Je suis prêt »**, puis l'hôte (onglet 1) lance la partie.
6. Mise en place : chacun choisit son symbole de départ à son tour (l'hôte en premier), puis les 12 tours partagés : le tour suivant se débloque quand **tous** ont validé.

## 📦 Déploiement

### Firebase Hosting (recommandé)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # répertoire public : dist, SPA : yes
npm run build
firebase deploy
```

### GitHub Pages (déploiement actuel)

```bash
npm run deploy      # build + publie dist/ sur la branche gh-pages (paquet gh-pages)
```

Le site est servi en page de projet (`https://<utilisateur>.github.io/d-track/`) : `vite.config.js` fixe donc `base: '/d-track/'` (manifest et service worker inclus). Si le dépôt est renommé ou dupliqué sous un autre nom, penser à adapter cette valeur.

### Netlify / Vercel

Build command : `npm run build` — répertoire de publication : `dist`. Rien d'autre à configurer (app 100 % statique + Firestore côté client). Adapter/retirer le `base` de `vite.config.js` si l'app est servie à la racine du domaine plutôt que dans un sous-dossier.

## 📐 Architecture

```
src/
├── game/            # logique PURE (testée sans DOM)
│   ├── symbols.js   # les 6 symboles (glyphe, couleur)
│   ├── grid.js      # grille 5×5, diagonale ×2, placement « de croissance » depuis [0,0]
│   ├── scoring.js   # séries, barème 2/3/8/10, malus −5, diagonale doublée, classement
│   └── dice.js      # lancers, séquence partagée (24 symboles à plat), codes de salon
├── net/firebase.js  # Firestore + Auth anonyme (init paresseuse : jamais chargé en solo)
├── ui/              # écrans et interactions (vanilla JS, zéro framework)
│   ├── gameScreen.js    # plateau partagé solo/en ligne (placement, dés animés)
│   ├── onlineFlow.js    # lobby, synchro des tours, déconnexions, revanche
│   ├── solo.js / results.js / home.js / rules.js / …
├── storage.js       # localStorage (records, historique, préférences, reprise)
└── main.js          # navigation, thème, PWA (installation, mises à jour, réseau)
tests/               # Vitest : scoring.test.js, grid.test.js
firestore.rules      # règles de sécurité à publier
```

### Choix de conception notables

- **Lancers partagés** : générés une seule fois par l'hôte à la création du salon et stockés à plat dans le document (`sharedRolls`, 24 entiers — Firestore refuse les tableaux imbriqués). Tous les clients déroulent la même séquence.
- **Placement « de croissance »** : la grille se remplit comme une zone connexe qui grandit depuis la case [0,0] — chaque case posée doit être adjacente (orthogonalement) à une case déjà occupée, y compris une case posée à l'instant même, plus tôt dans le même tour. Cette zone occupée ne pouvant jamais être totalement enfermée sur une grille non pleine, un placement légal existe toujours (aucun repli nécessaire).
- **Mise en place séquentielle** : en multijoueur, `pickOrder`/`pickIndex` désignent qui doit choisir son symbole initial (l'hôte en premier, puis les autres par ordre d'arrivée) ; les symboles déjà pris sont grisés en temps réel chez tous les joueurs. En solo, aucune contrainte (choix libre immédiat).
- **Score en temps réel** : chaque placement vérifie si sa ligne/colonne/diagonale vient d'être complétée (via `checkZoneCompletions`, qui réutilise la même fonction `scoreZone` que le calcul final) ; chaque zone n'est comptée qu'une seule fois, au moment précis où elle se remplit — le total HUD et le score final recalculé sont donc toujours strictement cohérents.
- **Rythme des tours** : chaque joueur valide à son rythme ; le tour N se débloque quand la progression **minimale** des joueurs actifs atteint N−1. Après 90 s d'attente, l'hôte peut « Continuer sans lui » (joueur marqué abandonné — si c'était son tour de choisir un symbole, l'ordre de choix avance automatiquement pour ne pas bloquer les suivants). Si l'hôte disparaît, le joueur actif le plus ancien reprend ce rôle.
- **Robustesse** : tout placement est revalidé par la logique pure (case vide + adjacence à la zone occupée), verrou anti double-validation, codes de salon vérifiés en transaction (collisions), choix de symbole initial vérifié en transaction (unicité + ordre de tour), reprise de partie après refresh/déconnexion (grille et score en temps réel restaurés depuis Firestore), parties de plus de 24 h ignorées.

## 📜 Règles du jeu (résumé)

**Mise en place** : chacun choisit librement un des 6 symboles (en multijoueur, chacun à son tour — l'hôte en premier — sans reprendre un symbole déjà pris) ; il est posé automatiquement en case [0,0], sans autre choix de position. **Puis 12 tours** : les 2 dés sont lancés une fois pour tous ; chaque forme se pose séparément sur n'importe quelle case vide adjacente (orthogonalement, jamais en diagonale) à une case déjà occupée de la grille — y compris une case tout juste posée dans le même tour. Les 2 formes n'ont pas besoin d'être adjacentes entre elles : la grille se remplit comme une zone qui grandit depuis le coin haut-gauche. Score par zone (5 lignes, 5 colonnes, diagonale) : série de 2 = 2 pts, 3 = 3 pts, 4 = 8 pts, 5 = 10 pts, cumulables ; zone sans série = −5 pts ; la diagonale (haut-droit → bas-gauche) compte **double**.
