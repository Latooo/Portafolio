// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio de proyecto en GitHub Pages: https://latooo.github.io/Portafolio/
export default defineConfig({
  site: 'https://latooo.github.io',
  base: '/Portafolio',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    // La raíz redirige a /es/ con src/pages/index.astro (redirección estática).
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Se excluyen el 404, la raíz y la redirección del CV antiguo (solo redirigen).
      filter: (page) =>
        !page.includes('/404') && !page.includes('/Storage/') && page !== 'https://latooo.github.io/Portafolio/',
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO', en: 'en-US' } },
    }),
  ],
});
