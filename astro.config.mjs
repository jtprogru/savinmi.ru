import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkDeflist from 'remark-deflist';

// Дизайн-система «Мишка на сервере» приезжает сабмодулем в vendor/mishka-ds и
// собирается перед сборкой сайта (make ds). В npm её нет, поэтому импортное имя
// из MIGRATION.md держится алиасом, а не зависимостью: node_modules-копия
// протухала бы при каждой пересборке пакета, а симлинка bun для file: не делает.
const mishkaStyles = fileURLToPath(
  new URL('./vendor/mishka-ds/dist/styles/index.css', import.meta.url),
);

export default defineConfig({
  site: 'https://savinmi.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '@jtprogru/mishka-ds/styles.css': mishkaStyles,
      },
    },
  },
  integrations: [
    sitemap({
      customPages: ['https://savinmi.ru/pdf/mikhail-savin-cv-sre.pdf'],
      serialize(item) {
        item.lastmod = new Date().toISOString();
        item.changefreq = 'monthly';
        item.priority = item.url === 'https://savinmi.ru/' ? 1.0 : 0.8;
        return item;
      },
    }),
  ],
  markdown: {
    // gfm и smartypants наследуются из дефолтов Astro (оба true).
    processor: unified({
      remarkPlugins: [remarkDeflist],
    }),
  },
});
