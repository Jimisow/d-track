// Bouton « Compte » de l'accueil — chargement PARESSEUX de l'écran de compte.
//
// Comme `net/kumpBridge.js` pour l'enregistrement des parties, ce fichier est
// le seul que l'accueil importe statiquement. Il ne connaît que le miroir
// local du pseudo (`storage.js`) et n'atteint `ui/account.js` — donc le SDK
// Firebase — qu'au clic du joueur. Ouvrir D-Track ne télécharge donc toujours
// rien de Firebase.

import { $ } from './dom.js';
import { getKumpName } from '../storage.js';
import { isKumpConfigured } from '../net/kumpConfig.js';

/**
 * Met le libellé du bouton à jour depuis le miroir local.
 * Masqué entièrement si le compte KUMP n'est pas configuré sur cette build —
 * un bouton qui ne peut qu'échouer vaut moins qu'aucun bouton.
 */
export function refreshAccountButton() {
  const bouton = $('#btn-account');
  const boutique = $('#btn-shop');
  // Masqués entièrement si le compte KUMP n'est pas configuré sur cette build —
  // un bouton qui ne peut qu'échouer vaut moins qu'aucun bouton.
  if (boutique) boutique.hidden = !isKumpConfigured;
  if (!bouton) return;
  if (!isKumpConfigured) {
    bouton.hidden = true;
    return;
  }
  const nom = getKumpName();
  bouton.hidden = false;
  bouton.textContent = nom ? `👤 ${nom}` : '👤 Compte';
}

/** Ouvre l'écran de compte, en le chargeant à la volée. */
export async function openAccountScreen() {
  if (!isKumpConfigured) return;
  const { openAccount } = await import('./account.js');
  openAccount({ onChange: refreshAccountButton });
}

/**
 * Habillage de la boutique fournie par `kump-account/ui`.
 *
 * Le module livre un écran de boutique COMPLET (catalogue, achat, équipement)
 * — D-Track n'a donc rien à écrire de tout ça, seulement à lui donner ses
 * couleurs. C'est tout l'intérêt de cette couche : le jour où un quatrième jeu
 * arrive, il redéfinit ces mêmes variables et il a sa boutique.
 *
 * Les valeurs reprennent les tokens de `styles.css`. On les lit à l'exécution
 * plutôt que de les recopier : changer de thème (clair/sombre) change donc
 * aussi la boutique, sans une ligne de plus.
 */
function themeKump() {
  const styles = getComputedStyle(document.documentElement);
  const token = (nom, defaut) => styles.getPropertyValue(nom).trim() || defaut;
  return {
    '--kump-surface': token('--surface', '#1c1f2e'),
    '--kump-surface-2': token('--surface-2', '#252a3d'),
    '--kump-border': token('--border', '#333a55'),
    '--kump-text': token('--text', '#eef0f8'),
    '--kump-text-dim': token('--text-dim', '#9aa1bd'),
    '--kump-accent': token('--accent', '#6c5ce7'),
    '--kump-danger': token('--danger', '#ef4444'),
    '--kump-radius': token('--radius', '16px'),
    '--kump-radius-sm': token('--radius-small', '10px'),
    '--kump-font': token('--font', 'inherit'),
  };
}

/** Ouvre la boutique. Charge le module à la volée, comme le reste. */
export async function openShopScreen() {
  if (!isKumpConfigured) return;
  // `net/kump.js` d'abord : c'est lui qui appelle `initKump()`. Ouvrir la
  // boutique sans ça donnerait « module non initialisé » et un écran vide.
  const kump = await import('../net/kump.js');
  kump.startKump();
  const ui = await import('kump-account/ui');
  ui.applyKumpTheme(themeKump());
  ui.openKumpShop({ onChange: refreshAccountButton });
}
