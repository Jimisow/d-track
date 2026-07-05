// Mode solo : lancers générés localement, 100% hors-ligne.
// Choix libre du symbole initial (aucun autre joueur, donc aucune contrainte).
import { rollForTurn, generateSharedRolls, TURNS } from '../game/dice.js';
import { scoreGrid } from '../game/scoring.js';
import { saveSoloResult } from '../storage.js';
import { showScreen } from './dom.js';
import { getBoard } from './gameScreen.js';
import { showSoloResults } from './results.js';
import { goHome } from './home.js';

export function startSolo() {
  const board = getBoard();
  const rolls = generateSharedRolls();

  const finish = (grid) => {
    const total = scoreGrid(grid, { finalScoring: true }).total;
    const isRecord = saveSoloResult(total);
    showSoloResults(grid, {
      isRecord,
      onReplay: () => startSolo(),
      onHome: () => goHome()
    });
  };

  board.onQuit = () => {
    if (confirm('Quitter la partie en cours ? Elle sera perdue.')) goHome();
  };

  board.onPick = (symbolId) => {
    board.commitInitialPick(symbolId);
    board.beginTurn(1, rollForTurn(rolls, 1));
  };

  board.onCommit = async ({ grid, turn }) => {
    if (turn < TURNS) {
      const next = turn + 1;
      await board.beginTurn(next, rollForTurn(rolls, next));
    } else {
      finish(grid);
    }
  };

  board.reset();
  showScreen('game');
  board.beginPickPhase({ takenSymbols: new Set(), myTurn: true });
}
