import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Déployé sur GitHub Pages en page de projet (https://<user>.github.io/d-track/) :
// tout doit être résolu sous ce sous-dossier, jamais à la racine du domaine.
const base = '/d-track/';

export default defineConfig({
  base,
  plugins: [
    VitePWA({
      // Mise à jour contrôlée : on affiche une bannière "Actualiser" plutôt
      // que de recharger sauvagement en pleine partie.
      registerType: 'prompt',
      includeAssets: [
        'icons/icon.svg', 'icons/icon-192.svg', 'icons/icon-512.svg', 'icons/icon-maskable.svg',
        'sounds/des.mp3', 'sounds/set.mp3', 'sounds/add.mp3', 'sounds/lose.mp3'
      ],
      manifest: {
        name: 'D-Track',
        short_name: 'D-Track',
        description: 'Jeu de dés roll & write — solo hors-ligne ou multijoueur en ligne (1 à 6 joueurs).',
        lang: 'fr',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#12141d',
        background_color: '#12141d',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icons/icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Précache de tout le shell applicatif → le mode solo fonctionne 100% hors-ligne.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest,mp3}'],
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            // Feuille de style Google Fonts (Nunito) — fallback système si absente.
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' }
          },
          {
            // Fichiers de police : cache-first, quasi immuables.
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            // Firestore / APIs Google : jamais de cache, temps réel uniquement.
            urlPattern: /^https:\/\/(firestore|identitytoolkit|securetoken|www)\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ]
});
