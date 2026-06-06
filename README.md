# [savinmi.ru](https://savinmi.ru)

[![ci](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?label=My%20CV&url=https%3A%2F%2Fsavinmi.ru)](https://savinmi.ru)

Моё резюме в виде статического сайта.

## Стек

- [Astro](https://astro.build) 5 — статический сайтогенератор
- [Markdown](https://daringfireball.net/projects/markdown/) — контент страниц (`src/pages/*.md`)
- Чистый CSS, без JS-фреймворков
- [Task](https://taskfile.dev) — раннер локальных команд
- GitHub Actions + GitHub Pages — сборка и деплой

## Структура

- `src/pages/` — страницы резюме (опыт, образование, проекты, скиллы и т.д.)
- `src/layouts/Page.astro` — общий layout
- `src/components/` — `Header.astro`, `Footer.astro`
- `src/styles/` — стили
- `public/` — статические ассеты
- `astro.config.mjs` — конфиг Astro

## Локальная разработка

Требуется Node.js 22+ и `npm`. Опционально — [Task](https://taskfile.dev).

```sh
# через Task
task install
task dev       # dev-сервер на :4321
task build     # сборка в ./dist
task preview   # предпросмотр прод-сборки
task clean

# либо напрямую через npm
npm install
npm run dev
npm run build
npm run preview
```

## Деплой

Push в `main` запускает workflow `.github/workflows/ci.yml`: сборка `npm run build` и публикация `./dist` на GitHub Pages.

## История

Сайт изначально собирался на [MkDocs Material](https://squidfunk.github.io/mkdocs-material/); в июне 2026 мигрирован на Astro (PR #194).

## License

[WTFPL](http://www.wtfpl.net)
