// Plateau de jeu partagé entre le mode solo et le mode en ligne.
//
// Mise en place : le joueur choisit librement UN des 6 symboles (en
// multijoueur, uniquement parmi ceux non déjà pris par un autre joueur — un
// seul joueur choisit à la fois, dans l'ordre du salon). Il est placé
// automatiquement en case [0,0], sans aucun choix de position.
//
// Tours suivants (12 tours) : les 2 dés sont lancés une seule fois pour tout
// le monde. Le joueur pose CHAQUE forme séparément sur n'importe quelle case
// vide adjacente (orthogonalement) à une case déjà occupée de sa grille — y
// compris adjacente à la forme qu'il vient tout juste de poser dans ce même
// tour. Les 2 cases choisies n'ont PAS besoin d'être adjacentes entre elles.
// La grille se remplit ainsi comme une zone connexe qui grandit depuis le
// coin haut-gauche.
//
// Feedback de score en temps réel : dès qu'un placement complète une zone
// (ligne, colonne ou la diagonale doublée), son score s'ajoute immédiatement
// au total affiché (badge flottant + pulsation des cases), en réutilisant la
// même fonction de scoring que le calcul final — chaque zone n'est comptée
// qu'une seule fois, au moment précis où elle se remplit.

import { SYMBOLS } from '../game/symbols.js';
import {
  CELLS, DIAGONAL, TOP_LEFT, createGrid, isEmpty, validPlacementCells,
  validateGrowthPlacement, placeAt, placeInitialSymbol
} from '../game/grid.js';
import { scoreZone, getZones, zoneKey, zonesContainingCell } from '../game/scoring.js';
import { TURNS } from '../game/dice.js';
import { $, toast, vibrate } from './dom.js';
import { playSound } from './sound.js';

const DIAG_SET = new Set(DIAGONAL);

// Plateau unique partagé entre les modes (les écouteurs DOM ne doivent être
// attachés qu'une seule fois) ; chaque mode réassigne onCommit / onPick / onQuit.
let sharedBoard = null;
export function getBoard() {
  if (!sharedBoard) sharedBoard = new GameBoard({});
  return sharedBoard;
}

export class GameBoard {
  // onCommit({ grid, turn }) : appelé après validation d'un tour (1–12) ;
  // onPick(symbolId) : appelé au choix du symbole initial ;
  // les deux peuvent être async (écriture Firestore) — le plateau reste
  // verrouillé tant que ça n'a pas abouti.
  constructor({ onCommit, onPick, onQuit }) {
    this.onCommit = onCommit;
    this.onPick = onPick;
    this.onQuit = onQuit;
    this.grid = createGrid();
    this.turn = 0;             // 1–12 pendant les tours partagés
    this.roll = null;          // [symbole, symbole] tels que lancés par les dés
    this.mode = 'idle';        // 'pick' | 'place' | 'idle'
    this.dieChoice = 0;        // dé choisi pour être posé en premier (0 par défaut, modifiable)
    this.pick1 = null;         // case choisie pour la forme de dieChoice
    this.pick2 = null;         // case choisie pour l'autre forme
    this.busy = false;
    this.justPlaced = [];      // cases à animer ("pop")
    this.scoredZones = new Set();
    this.liveScore = 0;
    this.displayedScore = 0;
    this._scoreAnimHandle = null;
    this._pickTakenSymbols = new Set();
    this._pickMyTurn = true;

    this.els = {
      turn: $('#hud-turn'),
      score: $('#hud-score'),
      hint: $('#game-hint'),
      diceRow: $('#dice-row'),
      dice: [$('#die-0'), $('#die-1')],
      picker: $('#symbol-picker'),
      grid: $('#grid'),
      cancel: $('#btn-cancel'),
      validate: $('#btn-validate'),
      quit: $('#game-quit')
    };

    this.buildGrid();
    this.buildPicker();
    this.els.dice[0].addEventListener('click', () => this.tapDie(0));
    this.els.dice[1].addEventListener('click', () => this.tapDie(1));
    this.els.cancel.addEventListener('click', () => this.clearSelection());
    this.els.validate.addEventListener('click', () => this.validate());
    this.els.quit.addEventListener('click', () => this.onQuit?.());
  }

  buildGrid() {
    this.els.grid.innerHTML = '';
    this.cellEls = [];
    for (let i = 0; i < CELLS; i++) {
      const cell = document.createElement('button');
      cell.className = 'cell' + (DIAG_SET.has(i) ? ' diag' : '');
      cell.setAttribute('role', 'gridcell');
      cell.addEventListener('click', () => this.tapCell(i));
      this.els.grid.append(cell);
      this.cellEls.push(cell);
    }
  }

  buildPicker() {
    this.els.picker.innerHTML = '';
    this.tileEls = SYMBOLS.map((s, id) => {
      const btn = document.createElement('button');
      btn.className = 'symbol-tile';
      btn.style.color = s.color;
      btn.textContent = s.glyph;
      btn.setAttribute('aria-label', s.name);
      btn.addEventListener('click', () => this.tapSymbol(id));
      this.els.picker.append(btn);
      return btn;
    });
  }

  // (Re)démarre une partie, éventuellement avec une grille restaurée (reprise en ligne).
  reset(grid = null) {
    this.grid = grid ? grid.map((c) => (c === -1 ? null : c)) : createGrid();
    this.mode = 'idle';
    this.roll = null;
    this.busy = false;
    this.justPlaced = [];
    this.dieChoice = 0;
    this.pick1 = null;
    this.pick2 = null;

    // Reprise d'une partie en cours : les zones déjà complètes ont déjà été
    // comptées avant la déconnexion — on les recompte silencieusement (sans
    // rejouer badge/pulsation) pour que le HUD reparte du bon total.
    this.scoredZones = new Set();
    this.liveScore = 0;
    for (const zone of getZones()) {
      const cells = zone.cells.map((i) => this.grid[i]);
      if (cells.every((c) => c !== null)) {
        const { points } = scoreZone(cells, { finalScoring: true });
        const multiplier = zone.type === 'diag' ? 2 : 1;
        this.scoredZones.add(zoneKey(zone));
        this.liveScore += points * multiplier;
      }
    }
    this.displayedScore = this.liveScore;
    this.els.score.textContent = `${this.liveScore} pts`;

    this.render();
  }

  // --- Mise en place : choix du symbole initial --------------------------------

  beginPickPhase({ takenSymbols = new Set(), myTurn = true, whoseTurnName = null } = {}) {
    this.mode = 'pick';
    this.busy = false;
    this._pickTakenSymbols = takenSymbols;
    this._pickMyTurn = myTurn;
    this.els.turn.textContent = 'Choix du symbole';
    this.els.hint.textContent = myTurn
      ? 'Choisissez votre symbole de départ : il sera posé en haut à gauche.'
      : `En attente que ${whoseTurnName || 'un autre joueur'} choisisse son symbole…`;
    this.renderPicker();
    this.render();
  }

  renderPicker() {
    this.tileEls.forEach((btn, id) => {
      const taken = this._pickTakenSymbols.has(id);
      btn.disabled = this.busy || taken || !this._pickMyTurn;
      btn.classList.toggle('taken', taken);
      btn.classList.toggle('inactive', !this._pickMyTurn && !taken);
    });
  }

  tapSymbol(id) {
    if (this.mode !== 'pick' || this.busy) return;
    if (!this._pickMyTurn || this._pickTakenSymbols.has(id)) return;
    this.busy = true;
    this.renderPicker();
    vibrate(10);
    Promise.resolve(this.onPick?.(id))
      .catch((err) => toast(err?.message || 'Erreur lors du choix du symbole.'))
      .finally(() => { this.busy = false; this.renderPicker(); });
  }

  // Applique le symbole initial choisi sur le plateau local (une seule fois,
  // que ce soit en solo ou après confirmation du serveur en multijoueur).
  commitInitialPick(symbolId) {
    this.grid = placeInitialSymbol(this.grid, symbolId);
    this.justPlaced = [TOP_LEFT];
    const completions = this.checkZoneCompletions(this.grid, TOP_LEFT);
    this.render();
    playSound('place');
    this.playCompletions(completions);
  }

  // --- Tours partagés (1–12) ----------------------------------------------------

  async beginTurn(turn, roll) {
    this.turn = turn;
    this.roll = roll;
    this.mode = 'place';
    this.dieChoice = 0; // 1re forme sélectionnée par défaut ; l'autre reste modifiable
    this.pick1 = null;
    this.pick2 = null;
    this.els.turn.textContent = `Tour ${turn}/${TURNS}`;
    this.els.hint.textContent = 'Lancement des dés…';
    this.render();
    await this.animateDice();
    this.els.hint.textContent = 'Touchez une case en surbrillance pour poser cette forme (ou choisissez l’autre dé).';
    this.render();
  }

  // Animation de roulement (~600 ms) : les faces défilent puis se figent.
  animateDice() {
    return new Promise((resolve) => {
      const dice = this.els.dice;
      playSound('dice');
      dice.forEach((d) => { d.classList.remove('rolling'); void d.offsetWidth; d.classList.add('rolling'); });
      const spin = setInterval(() => {
        dice.forEach((d) => {
          const s = SYMBOLS[Math.floor(Math.random() * 6)];
          d.textContent = s.glyph;
          d.style.color = s.color;
        });
      }, 70);
      setTimeout(() => {
        clearInterval(spin);
        dice.forEach((d, k) => {
          const s = SYMBOLS[this.roll[k]];
          d.textContent = s.glyph;
          d.style.color = s.color;
          d.classList.remove('rolling');
        });
        vibrate(15);
        resolve();
      }, 620);
    });
  }

  // --- Interactions ------------------------------------------------------------

  // Le joueur choisit directement quel dé poser en premier — seul le tout
  // 1er choix de case est concerné : une fois pick1 posé, il ne reste qu'un
  // seul dé, son emploi pour la 2e case est donc automatique.
  tapDie(k) {
    if (this.busy || this.mode !== 'place' || this.pick1 !== null) return;
    this.dieChoice = k;
    vibrate(8);
    this.els.hint.textContent = 'Touchez une case en surbrillance pour poser cette forme.';
    this.render();
  }

  // Grille hypothétique avec la 1re forme déjà posée (mais pas encore
  // validée), pour calculer les cases valides de la 2e forme — y compris
  // adjacente à la case que le joueur vient tout juste de choisir.
  _workingGridAfterFirst() {
    const g = this.grid.slice();
    g[this.pick1] = this.roll[this.dieChoice];
    return g;
  }

  tapCell(i) {
    if (this.busy || this.mode !== 'place') return;

    // Re-tap sur une case déjà choisie → désélection (le dé reste sélectionné).
    if (i === this.pick1 && this.pick2 === null) {
      this.pick1 = null;
      this.els.hint.textContent = 'Touchez une case en surbrillance pour poser cette forme (ou choisissez l’autre dé).';
      this.render();
      return;
    }
    if (i === this.pick2) {
      this.pick2 = null;
      this.els.hint.textContent = 'Touchez une case en surbrillance pour poser l’autre forme.';
      this.render();
      return;
    }

    if (this.pick1 === null) {
      if (!isEmpty(this.grid, i) || !validPlacementCells(this.grid).includes(i)) return;
      this.pick1 = i;
      vibrate(8);
      playSound('place');
      this.els.hint.textContent = 'Touchez une case en surbrillance pour poser l’autre forme.';
      this.render();
      return;
    }

    if (this.pick2 === null) {
      if (i === this.pick1) return;
      const working = this._workingGridAfterFirst();
      if (!isEmpty(this.grid, i) || !validPlacementCells(working).includes(i)) return;
      this.pick2 = i;
      vibrate(8);
      playSound('place');
      this.els.hint.textContent = 'Validez pour confirmer.';
      this.render();
      return;
    }

    // Les deux cases sont déjà choisies : Annuler pour recommencer.
  }

  clearSelection() {
    if (this.busy || this.mode !== 'place') return;
    this.dieChoice = 0;
    this.pick1 = null;
    this.pick2 = null;
    this.els.hint.textContent = 'Touchez une case en surbrillance pour poser cette forme (ou choisissez l’autre dé).';
    this.render();
  }

  // Vérifie, pour une case tout juste remplie, si elle complète une ou
  // plusieurs zones (ligne/colonne/diagonale) pas encore comptées. Réutilise
  // scoreZone (même barème que le calcul final) — chaque zone n'est comptée
  // qu'une fois, jamais recalculée ni réaffichée en double ensuite.
  checkZoneCompletions(grid, cellIndex) {
    const newlyCompleted = [];
    for (const zone of zonesContainingCell(cellIndex)) {
      const key = zoneKey(zone);
      if (this.scoredZones.has(key)) continue;
      const cells = zone.cells.map((idx) => grid[idx]);
      if (cells.some((c) => c === null || c === undefined)) continue; // pas encore complète
      const { points } = scoreZone(cells, { finalScoring: true });
      const multiplier = zone.type === 'diag' ? 2 : 1;
      const zonePoints = points * multiplier;
      this.scoredZones.add(key);
      this.liveScore += zonePoints;
      newlyCompleted.push({ zone, points: zonePoints });
    }
    return newlyCompleted;
  }

  // Validation définitive — la logique pure revalide TOUT (jamais confiance à
  // l'UI), et le verrou `busy` empêche les doubles validations.
  async validate() {
    if (this.busy || this.mode !== 'place') return;
    if (this.pick1 === null || this.pick2 === null) return;

    let afterFirst, afterBoth;
    try {
      const symbol1 = this.roll[this.dieChoice];
      const symbol2 = this.roll[1 - this.dieChoice];
      const check1 = validateGrowthPlacement(this.grid, this.pick1);
      if (!check1.ok) { toast(check1.error); return; }
      afterFirst = placeAt(this.grid, this.pick1, symbol1);

      const check2 = validateGrowthPlacement(afterFirst, this.pick2);
      if (!check2.ok) { toast(check2.error); return; }
      afterBoth = placeAt(afterFirst, this.pick2, symbol2);
    } catch (err) {
      toast(err.message);
      return;
    }

    this.busy = true;
    const committedTurn = this.turn;
    const cell1 = this.pick1;
    const cell2 = this.pick2;
    this.grid = afterBoth;
    this.justPlaced = [cell1, cell2];
    this.mode = 'idle';
    this.dieChoice = null;
    this.pick1 = null;
    this.pick2 = null;
    this.render();
    vibrate(20);
    this.els.hint.textContent = '';

    // La 1re forme est vérifiée avant la 2e : une zone partagée par les deux
    // cases ne peut se compléter qu'à la 2e, jamais comptée en double.
    const completions = [
      ...this.checkZoneCompletions(afterFirst, cell1),
      ...this.checkZoneCompletions(afterBoth, cell2)
    ];
    this.playCompletions(completions);

    try {
      await this.onCommit({ grid: this.grid.slice(), turn: committedTurn });
    } finally {
      this.busy = false;
    }
  }

  // --- Feedback de score en temps réel -------------------------------------------

  playCompletions(completions) {
    if (!completions.length) return;
    for (const { zone, points } of completions) {
      this.spawnScoreBadge(zone, points);
      this.pulseZoneCells(zone);
      playSound(points >= 0 ? 'gain' : 'lose');
    }
    this.animateScoreTo(this.liveScore);
  }

  spawnScoreBadge(zone, points) {
    const wrap = document.querySelector('.grid-wrap');
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const rects = zone.cells.map((i) => this.cellEls[i].getBoundingClientRect());
    const cx = rects.reduce((sum, r) => sum + r.left + r.width / 2, 0) / rects.length - wrapRect.left;
    const cy = rects.reduce((sum, r) => sum + r.top + r.height / 2, 0) / rects.length - wrapRect.top;

    const badge = document.createElement('div');
    badge.className = `score-badge ${points >= 0 ? 'pos' : 'neg'}`;
    badge.textContent = `${points > 0 ? '+' : ''}${points}`;
    badge.style.left = `${cx}px`;
    badge.style.top = `${cy}px`;
    wrap.appendChild(badge);
    badge.addEventListener('animationend', () => badge.remove());
    setTimeout(() => badge.remove(), 1400); // filet de sécurité
  }

  pulseZoneCells(zone) {
    for (const i of zone.cells) {
      const cellEl = this.cellEls[i];
      cellEl.classList.remove('zone-pulse');
      void cellEl.offsetWidth; // relance l'animation si déjà présente
      cellEl.classList.add('zone-pulse');
      setTimeout(() => cellEl.classList.remove('zone-pulse'), 1100);
    }
  }

  // Anime le compteur HUD du score affiché vers `target` (~700 ms), plutôt
  // qu'un saut instantané — le score final recalculé en fin de partie utilise
  // la même fonction de scoring et correspond donc exactement à ce total.
  animateScoreTo(target) {
    if (this.displayedScore === target) return;
    const start = this.displayedScore;
    const startTime = performance.now();
    const duration = 700;
    cancelAnimationFrame(this._scoreAnimHandle);
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - p) * (1 - p);
      const value = Math.round(start + (target - start) * eased);
      this.els.score.textContent = `${value} pts`;
      if (p < 1) {
        this._scoreAnimHandle = requestAnimationFrame(step);
      } else {
        this.displayedScore = target;
      }
    };
    this._scoreAnimHandle = requestAnimationFrame(step);
  }

  // --- Rendu ---------------------------------------------------------------------

  render() {
    const inPick = this.mode === 'pick';
    this.els.picker.hidden = !inPick;
    this.els.diceRow.hidden = inPick;

    const workingAfterFirst = (this.mode === 'place' && this.pick1 !== null) ? this._workingGridAfterFirst() : null;
    const validForFirst = (this.mode === 'place' && this.pick1 === null)
      ? new Set(validPlacementCells(this.grid)) : null;
    const validForSecond = (this.mode === 'place' && this.pick1 !== null && this.pick2 === null)
      ? new Set(validPlacementCells(workingAfterFirst)) : null;

    for (let i = 0; i < CELLS; i++) {
      const cellEl = this.cellEls[i];
      const value = this.grid[i];
      const filled = value !== null;

      cellEl.classList.toggle('filled', filled);
      cellEl.classList.remove('selected', 'hint', 'dimmed', 'preview', 'pop');
      cellEl.innerHTML = '';

      if (filled) {
        const s = SYMBOLS[value];
        const span = document.createElement('span');
        span.textContent = s.glyph;
        cellEl.style.color = s.color;
        cellEl.append(span);
        if (this.justPlaced.includes(i)) cellEl.classList.add('pop');
      } else {
        cellEl.style.color = '';
      }

      // Aperçu de la forme en cours de placement.
      if (!filled && (i === this.pick1 || i === this.pick2)) {
        const symbol = i === this.pick1 ? this.roll[this.dieChoice] : this.roll[1 - this.dieChoice];
        const s = SYMBOLS[symbol];
        const span = document.createElement('span');
        span.textContent = s.glyph;
        span.style.opacity = '0.75';
        cellEl.style.color = s.color;
        cellEl.append(span);
        cellEl.classList.add('preview', 'selected');
        continue;
      }

      // Aide visuelle : cases valides en surbrillance, les autres grisées.
      if (this.mode === 'place' && !filled) {
        if (validForFirst) {
          cellEl.classList.toggle('hint', validForFirst.has(i));
          cellEl.classList.toggle('dimmed', !validForFirst.has(i));
        } else if (validForSecond) {
          cellEl.classList.toggle('hint', validForSecond.has(i));
          cellEl.classList.toggle('dimmed', !validForSecond.has(i));
        } else {
          cellEl.classList.add('dimmed'); // les 2 formes du tour sont déjà posées
        }
      }
    }
    this.justPlaced = [];

    // Dés : la 1re forme est sélectionnée par défaut, modifiable tant que la
    // 1re case n'est pas posée ; le dé choisi se grise dès que sa case est
    // posée, le second automatiquement à son tour.
    this.els.dice.forEach((d, k) => {
      const isChosen = k === this.dieChoice;
      const isOther = k === 1 - this.dieChoice;
      const placed = (isChosen && this.pick1 !== null) || (isOther && this.pick2 !== null);
      d.classList.toggle('selectable', this.mode === 'place' && !this.busy && this.pick1 === null);
      d.classList.toggle('selected', isChosen && this.pick1 === null);
      d.classList.toggle('used', this.mode === 'place' && placed);
    });

    const readyToValidate = this.mode === 'place' && this.pick1 !== null && this.pick2 !== null;
    const hasSomethingToCancel = this.dieChoice !== 0 || this.pick1 !== null || this.pick2 !== null;
    this.els.cancel.disabled = this.busy || !(this.mode === 'place' && hasSomethingToCancel);
    this.els.validate.disabled = this.busy || !readyToValidate;
  }
}
