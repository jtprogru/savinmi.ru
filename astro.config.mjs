import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://savinmi.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
