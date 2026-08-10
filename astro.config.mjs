import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkDeflist from 'remark-deflist';

export default defineConfig({
  site: 'https://savinmi.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
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
