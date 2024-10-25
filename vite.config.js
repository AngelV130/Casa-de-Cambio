// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Casa De Cambio APP',
        short_name: 'Aplicación para una casa de cambio',
        description: 'Aplicación que simula una casa de cambio',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/image.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/image.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
