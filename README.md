# [savinmi.ru](https://savinmi.ru)

[![ci](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jtprogru/savinmi.ru/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?label=My%20CV&url=https%3A%2F%2Fsavinmi.ru)](https://savinmi.ru)

Резюме Михаила Савина (Lead SRE) в виде статического сайта: опыт, навыки, проекты, образование, награды, интересы. Собирается Astro, деплоится на GitHub Pages, живёт на своём домене.

## Стек

- [Astro](https://astro.build) 7 — статический сайтогенератор
- [Markdown](https://daringfireball.net/projects/markdown/) — контент страниц (`src/pages/*.md`)
- Чистый CSS, без JS-фреймворков; единственный inline-скрипт — переключатель темы
- [bun](https://bun.sh) — зависимости, запуск и сборка
- `make` — раннер локальных команд, они же используются в CI
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) — линт контента
- GitHub Actions + GitHub Pages — сборка и деплой

## Структура

- `src/pages/` — страницы резюме (`index`, `experience`, `skills`, `projects`, `education`, `awards`, `interests`, `privacy`) и кастомная `404.astro`
- `src/layouts/Page.astro` — общий layout: head/meta, шрифты, переключатель темы (light/system/dark), Яндекс.Метрика
- `src/components/` — `Header.astro`, `Footer.astro`, `Seo.astro`
- `src/data/person.ts` — единый источник профилей и данных о сущности (футер + JSON-LD)
- `src/styles/global.css` — стили
- `public/` — статика: `img/`, `pdf/`, `robots.txt`, `CNAME`, ключ IndexNow
- `astro.config.mjs` — конфиг Astro (site, `trailingSlash: always`, sitemap, `remark-deflist`)
- `Makefile` — локальные команды
- `scripts/bun-dependency-snapshot.mjs` — снапшот дерева зависимостей для GitHub
- `.github/workflows/ci.yml` — весь пайплайн
- `.markdownlint.yaml` — правила линтера

## Локальная разработка

Требуется [bun](https://bun.sh) 1.3+ и `make`.

```sh
make                     # список целей
make install             # зависимости
make dev                 # dev-сервер на :4321
make build               # сборка в ./dist
make preview             # предпросмотр прод-сборки
make lint                # markdownlint
make check               # линт и сборка
make dependency-snapshot # дерево зависимостей в dependency-snapshot.json
make clean               # удалить ./dist, ./.astro и снапшот
make distclean           # то же плюс ./node_modules
```

Порт переопределяется переменной: `make dev PORT=3000`.

Зависимости переустанавливаются только когда `package.json` или `bun.lock` новее `node_modules`. В CI (`CI=true`) установка идёт с `--frozen-lockfile`.

## SEO и индексация

- `src/components/Seo.astro` собирает связный JSON-LD-граф (`Person`, `WebSite`, `ProfilePage`/`WebPage`, `Organization`, `BreadcrumbList`) — данные берутся из `src/data/person.ts`, чтобы футер и разметка не расходились.
- `@astrojs/sitemap` генерирует `sitemap-index.xml` с `lastmod`, `changefreq` и приоритетами; PDF-резюме добавлено отдельной `customPages`.
- `public/robots.txt` явно разрешает AI-краулеры (OAI-SearchBot, PerplexityBot, ClaudeBot и другие).
- После каждого деплоя CI пингует IndexNow — Яндекс и Bing переобходят быстрее, чем по расписанию sitemap. Ключ по протоколу публичный и лежит в `public/<key>.txt`.
- Страница 404 закрыта от индексации через `noindex`.

## CI/CD

Push в `main` (или `workflow_dispatch`) запускает `.github/workflows/ci.yml`:

| job | что делает |
| --- | --- |
| `lint` | `make lint` — markdownlint по `src/pages/*.md` и `README.md` |
| `dependency-graph` | `make dependency-snapshot` и отправка дерева через Dependency Submission API |
| `build` | `make build` и загрузка `./dist` как Pages-артефакта |
| `deploy` | публикация на GitHub Pages |
| `indexnow` | пинг IndexNow после успешного деплоя |
| `notify` | итог пайплайна в Telegram (`if: always()`) |

Граф зависимостей GitHub не читает `bun.lock`, поэтому дерево отдаётся ему явно. Без этого в графе видны только прямые зависимости и не приходят алерты по транзитивным CVE.

Уведомлениям нужны секреты репозитория `TELEGRAM_BOT_TOKEN` и `TELEGRAM_USER_ID`. Если их нет, job не падает — недоставка попадает в лог warning'ом.

## История

Сайт изначально собирался на [MkDocs Material](https://squidfunk.github.io/mkdocs-material/); в июне 2026 мигрирован на Astro (PR #194). Позже раннер переехал с Task на `make`, а пакетный менеджер с npm на bun.

## License

[MIT](LICENSE)
