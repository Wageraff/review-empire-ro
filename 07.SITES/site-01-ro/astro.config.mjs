import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Fastpanel / VPS: static `dist/` behind nginx (recommended for pilot).
// Later: hybrid ponturi via @astrojs/node if live API needed.
export default defineConfig({
  site: 'https://betoteca.ro',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro'],
  },
});
