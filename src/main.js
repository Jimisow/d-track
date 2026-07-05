// Point d'entrée : navigation, thème, PWA (installation + mises à jour),
// détection réseau, formulaires création/rejoindre.
//
// Le module réseau (Firebase) est importé DYNAMIQUEMENT : le mode solo
// n'en a pas besoin et reste 100% fonctionnel hors-ligne.

import './styles.css';
import { registerSW } from 'virtual:pwa-register';
import { $, $$, showScreen, toast } from './ui/dom.js';
import { getTheme, setTheme, getPlayerName, setPlayerName, getHistory, getActiveGame, setActiveGame } from './storage.js';
import { startSolo } from './ui/solo.js';
import { renderRules } from './ui/rules.js';
import { refreshHome, goHome } from './ui/home.js';
import { el } from './ui/dom.js';

// ---------- Thème (sombre par défaut, clair en option) ----------

document.documentElement.dataset.theme = getTheme();

$('#btn-theme').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  setTheme(next);
});

// ---------- Service worker : précache + bannière de mise à jour ----------

const updateSW = registerSW({
  onNeedRefresh() {
    $('#banner-update').hidden = false;
  },
  onOfflineReady() {
    toast('D-Track est prêt à fonctionner hors-ligne ✔');
  }
});

$('#btn-update').addEventListener('click', () => updateSW(true));

// ---------- Invite d'installation PWA ----------

let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
  $('#btn-install').hidden = false;
});

$('#btn-install').addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  $('#btn-install').hidden = true;
});

// ---------- Détection de perte de réseau (multijoueur) ----------

function updateNetworkBanner() {
  $('#banner-offline').hidden = navigator.onLine;
}
window.addEventListener('online', () => { updateNetworkBanner(); toast('Connexion rétablie ✔'); });
window.addEventListener('offline', updateNetworkBanner);
updateNetworkBanner();

// ---------- Navigation ----------

$$('.btn-back[data-back]').forEach((btn) => btn.addEventListener('click', () => goHome()));
$('#results-home').addEventListener('click', () => goHome());
$('#viewer-close').addEventListener('click', () => $('#grid-viewer').close());

$('#btn-solo').addEventListener('click', () => startSolo());

$('#btn-rules').addEventListener('click', () => {
  renderRules();
  showScreen('rules');
});

$('#btn-history').addEventListener('click', () => {
  const content = $('#history-content');
  content.innerHTML = '';
  const history = getHistory();
  if (!history.length) {
    content.append(el('p', { style: 'color:var(--text-dim);font-weight:600;text-align:center;margin-top:30px' },
      'Aucune partie solo jouée pour le moment.'));
  } else {
    content.append(el('ul', { class: 'history-list' },
      history.map((h) => el('li', {},
        el('span', {}, `${h.score} pts`),
        el('span', { class: 'date' }, new Date(h.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }))
      ))
    ));
  }
  showScreen('history');
});

// ---------- Créer / Rejoindre / Reprendre (multijoueur) ----------

let setupMode = 'create';

function openSetup(mode) {
  setupMode = mode;
  $('#setup-title').textContent = mode === 'create' ? 'Créer une partie' : 'Rejoindre une partie';
  $('#setup-submit').textContent = mode === 'create' ? 'Créer le salon' : 'Rejoindre';
  $('#setup-code-row').hidden = mode === 'create';
  $('#input-code').required = mode === 'join';
  $('#input-name').value = getPlayerName();
  $('#input-code').value = '';
  $('#setup-error').hidden = true;
  showScreen('online-setup');
}

$('#btn-create').addEventListener('click', () => openSetup('create'));
$('#btn-join').addEventListener('click', () => openSetup('join'));

$('#setup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorEl = $('#setup-error');
  const submitBtn = $('#setup-submit');
  errorEl.hidden = true;

  const name = $('#input-name').value.trim();
  const code = $('#input-code').value.trim().toUpperCase();

  if (!name) {
    errorEl.textContent = 'Choisissez un pseudo.';
    errorEl.hidden = false;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Connexion…';
  try {
    setPlayerName(name);
    const flow = await import('./ui/onlineFlow.js');
    if (setupMode === 'create') await flow.createOnline(name);
    else await flow.joinOnline(code, name);
  } catch (err) {
    console.error(err);
    let message = err?.userMessage;
    if (!message) {
      try {
        const netModule = await import('./net/firebase.js');
        message = netModule.frenchError(err);
      } catch {
        message = 'Connexion impossible. Vérifiez votre réseau.';
      }
    }
    errorEl.textContent = message;
    errorEl.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = setupMode === 'create' ? 'Créer le salon' : 'Rejoindre';
  }
});

// Reprise d'une partie en ligne interrompue.
$('#btn-resume').addEventListener('click', async () => {
  const active = getActiveGame();
  if (!active) return;
  const btn = $('#btn-resume');
  btn.disabled = true;
  try {
    const flow = await import('./ui/onlineFlow.js');
    await flow.resumeOnline(active.code);
  } catch (err) {
    console.error(err);
    toast(err?.userMessage || 'Impossible de reprendre cette partie.');
    setActiveGame(null);
    refreshHome();
  } finally {
    btn.disabled = false;
  }
});

// ---------- Démarrage ----------

refreshHome();
showScreen('home');
