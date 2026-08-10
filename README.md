# [savinmi.ru](https://savinmi.ru)

[![ci](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?label=My%20CV&url=https%3A%2F%2Fsavinmi.ru)](https://savinmi.ru)

Моё резюме в виде статического сайта.

## Стек

- [Astro](https://astro.build) 7 — статический сайтогенератор
- [Markdown](https://daringfireball.net/projects/markdown/) — контент страниц (`src/pages/*.md`)
- Чистый CSS, без JS-фреймворков
- [bun](https://bun.sh) — зависимости, запуск и сборка
- `make` — раннер локальных команд
- GitHub Actions + GitHub Pages — сборка и деплой

## Структура

- `src/pages/` — страницы резюме (опыт, образование, проекты, скиллы и т.д.)
- `src/layouts/Page.astro` — общий layout
- `src/components/` — `Header.astro`, `Footer.astro`, `Seo.astro`
- `src/data/person.ts` — единый источник профилей и данных о сущности (footer + JSON-LD)
- `src/styles/` — стили
- `public/` — статические ассеты
- `astro.config.mjs` — конфиг Astro
- `Makefile` — локальные команды, они же используются в CI

## Локальная разработка

Требуется [bun](https://bun.sh) 1.3+ и `make`.

```sh
make            # список целей
make install    # зависимости
make dev        # dev-сервер на :4321
make build      # сборка в ./dist
make preview    # предпросмотр прод-сборки
make lint       # markdownlint
make check      # линт и сборка
make clean      # удалить ./dist и ./.astro
```

Порт переопределяется переменной: `make dev PORT=3000`.

## Деплой

Push в `main` запускает workflow `.github/workflows/ci.yml`: `make lint`, `make build`, публикация `./dist` на GitHub Pages и пинг IndexNow.

## История

Сайт изначально собирался на [MkDocs Material](https://squidfunk.github.io/mkdocs-material/); в июне 2026 мигрирован на Astro (PR #194).

## License

[WTFPL](http://www.wtfpl.net)
