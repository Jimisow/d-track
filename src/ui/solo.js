// Mode solo : lancers générés localement, 100% hors-ligne.
// Choix libre du symbole initial (aucun autre joueur, donc aucune contrainte).
import { rollForTurn, generateSharedRolls, TURNS } from '../game/dice.js';
import { scoreGrid } from '../game/scoring.js';
import { saveSoloResult } from '../storage.js';
import { showScreen } from './dom.js';
import { getBoard } from './gameScreen.js';
import { showSoloResults } from './results.js';
import { goHome } from './home.js';
import { sendToKump } from '../net/kumpBridge.js';

export function startSolo() {
  const board = getBoard();
  const rolls = generateSharedRolls();

  // Trace de la partie pour le compte KUMP : le serveur de validation REJOUE
  // la partie au lieu de croire le score annoncé, il lui faut donc le symbole
  // de départ et l'ordre exact des placements (voir net/kump.js). Purement
  // local tant qu'aucune partie n'est finie — trois variables, aucun coût.
  const startedAt = Date.now();
  const moves = [];
  let initialSymbol = null;

  const finish = (grid) => {
    const total = scoreGrid(grid, { finalScoring: true }).total;
    const isRecord = saveSoloResult(total);
    // Envoyé APRÈS l'enregistrement local et sans `await` : l'écran de
    // résultats ne doit jamais attendre le réseau, et une partie qui ne part
    // pas est mise en file, pas perdue.
    sendToKump({ mode: 'solo', initialSymbol, rolls, moves, durationMs: Date.now() - startedAt });
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
    initialSymbol = symbolId;
    board.commitInitialPick(symbolId);
    board.beginTurn(1, rollForTurn(rolls, 1));
  };

  board.onCommit = async ({ grid, turn, moves: turnMoves }) => {
    moves.push(...turnMoves);
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
