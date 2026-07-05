// Lancers de dés et codes de salon — fonctions pures (rng injectable pour les tests).

export const TURNS = 12; // tours partagés après le tour initial

export function rollDie(rng = Math.random) {
  return Math.floor(rng() * 6);
}

// Séquence complète des 12 lancers partagés, À PLAT (24 entiers) car Firestore
// n'accepte pas les tableaux imbriqués. Le lancer du tour t (1–12) occupe les
// index 2(t−1) et 2(t−1)+1.
export function generateSharedRolls(rng = Math.random) {
  const rolls = [];
  for (let t = 0; t < TURNS; t++) rolls.push(rollDie(rng), rollDie(rng));
  return rolls;
}

export function rollForTurn(rolls, turn) {
  if (!Array.isArray(rolls) || turn < 1 || turn > rolls.length / 2) return null;
  return [rolls[(turn - 1) * 2], rolls[(turn - 1) * 2 + 1]];
}

// Alphabet sans caractères ambigus à l'oral : pas de 0/O ni de 1/I.
export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const CODE_LENGTH = 5;

export function generateCode(rng = Math.random) {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(rng() * CODE_ALPHABET.length)];
  }
  return code;
}

export function isValidCode(code) {
  return typeof code === 'string'
    && code.length === CODE_LENGTH
    && [...code].every((ch) => CODE_ALPHABET.includes(ch));
}
