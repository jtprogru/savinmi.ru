import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDeflist from 'remark-deflist';

export default defineConfig({
  site: 'https://savinmi.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkDeflist],
  },
});
