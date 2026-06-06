import { defineConfig } from 'astro/config';
import remarkDeflist from 'remark-deflist';

export default defineConfig({
  site: 'https://savinmi.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    remarkPlugins: [remarkDeflist],
  },
});
