// Petits utilitaires DOM partagés par tous les écrans.

export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => [...document.querySelectorAll(sel)];

// Création d'élément : el('div', { class: 'x', onclick: fn }, enfant1, 'texte'…)
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value);
    } else if (key === 'class') {
      node.className = value;
    } else if (value !== false && value !== null && value !== undefined) {
      node.setAttribute(key, value === true ? '' : value);
    }
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined) continue;
    node.append(child.nodeType ? child : document.createTextNode(child));
  }
  return node;
}

// Navigation entre écrans (sections .screen dans index.html).
export function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === `screen-${id}`));
  window.scrollTo(0, 0);
}

export function currentScreen() {
  return document.querySelector('.screen.active')?.id.replace('screen-', '') || null;
}

// Toast furtif en bas d'écran.
let toastTimer = null;
export function toast(message, ms = 2600) {
  const node = $('#toast');
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { node.hidden = true; }, ms);
}

// Feedback haptique léger si le matériel le permet.
export function vibrate(pattern = 12) {
  try { navigator.vibrate?.(pattern); } catch { /* non supporté */ }
}
