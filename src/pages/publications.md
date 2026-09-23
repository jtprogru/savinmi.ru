---
layout: ../layouts/Page.astro
title: Доклады и публикации
description: Доклады, статьи и подкасты Михаила Савина — цикл про SLO и бюджет ошибок, статьи на Habr о личной базе знаний, лекции в РТУ МИРЭА и восемь выпусков подкаста «В SREду на кухне».
# Машиночитаемый срез списка ниже: уходит в JSON-LD как ItemList,
# каждый элемент привязывается к сущности автора. Правишь список
# в тексте — поправь и здесь.
works:
    - name: "SLO как чертёж архитектуры"
      url: https://jtprog.ru/posts/slo-as-architecture-blueprint/
      type: BlogPosting
    - name: "Скорость сгорания бюджета ошибок — что тут не так?"
      url: https://jtprog.ru/posts/burn-rate-is-not-speed/
      type: BlogPosting
    - name: "Надёжность строится в диалоге с бизнесом"
      url: https://jtprog.ru/posts/reliability-is-a-conversation/
      type: BlogPosting
    - name: "Digital Immune System: инженерия устойчивости как продукт"
      url: https://jtprog.ru/posts/digital-immune-system-maturity/
      type: BlogPosting
    - name: "Что происходит, когда ты открываешь сайт"
      url: https://jtprog.ru/posts/what-happens-when-you-open-website/
      type: BlogPosting
    - name: "Зачем вести базу знаний, если ты не блогер и не спикер"
      url: https://habr.com/ru/articles/1070224/
      type: Article
      publisher: Habr
    - name: "Содержимое моей персональной базы знаний"
      url: https://habr.com/ru/articles/1033090/
      type: Article
      publisher: Habr
    - name: "Комьюнити живёт ровно настолько, насколько компания считает его работой"
      url: https://devrel.ru/komuniti-zhivet-esli-rabota
      type: Article
      publisher: DevRel.ru
    - name: "Личная база знаний. Что это за зверь такой…"
      url: https://jtprogru.github.io/pkbd/
      type: PresentationDigitalDocument
    - name: "В SREду на кухне"
      url: https://www.youtube.com/playlist?list=PLknJ4Vr6efQGz5LIO9taObaoNK_Mld6F4
      type: PodcastSeries
      publisher: Avito
      role: contributor
---

# Доклады и публикации

Что я пишу и рассказываю про SRE: цикл заметок про SLO и бюджет ошибок, статьи о личной базе знаний, лекции и подкаст. Свежее появляется в блоге [jtprog.ru](https://jtprog.ru) и в Telegram-канале [Мишка на сервере](https://t.me/+15SbUb5yCRw4NzVi).

## Цикл про SLO и надёжность

Четыре текста, которые лучше читать подряд:

- [SLO как чертёж архитектуры](https://jtprog.ru/posts/slo-as-architecture-blueprint/) — один поиск маркетплейса на трёх уровнях SLO порождает три разные системы, а error budget становится валютой в спорах.
- [Скорость сгорания бюджета ошибок — что тут не так?](https://jtprog.ru/posts/burn-rate-is-not-speed/) — burn rate это безразмерный коэффициент, а не скорость, и на низконагруженных сервисах он начинает врать.
- [Надёжность строится в диалоге с бизнесом](https://jtprog.ru/posts/reliability-is-a-conversation/) — SLO становится контрактом только через error budget policy, иначе это украшение дашборда.
- [Digital Immune System: инженерия устойчивости как продукт](https://jtprog.ru/posts/digital-immune-system-maturity/) — чем зрелый DIS отличается от набора практик: петля обратной связи, SLO как gate в CI/CD, границы автоматики.

## Инфраструктура, знания и комьюнити

- [Что происходит, когда ты открываешь сайт](https://jtprog.ru/posts/what-happens-when-you-open-website/) — путь запроса от нажатия Enter до пикселя на экране: кэши браузера, DNS, TCP и TLS, CDN и BGP, приём пакета ядром Linux, nginx и рендеринг.
- [Зачем вести базу знаний, если ты не блогер и не спикер](https://habr.com/ru/articles/1070224/) — на Habr: что даёт личная база знаний тому, кто не пишет статей и не выступает.
- [Содержимое моей персональной базы знаний](https://habr.com/ru/articles/1033090/) — на Habr: что лежит в моём Obsidian и по каким темам.
- [Комьюнити живёт ровно настолько, насколько компания считает его работой](https://devrel.ru/komuniti-zhivet-esli-rabota) — на DevRel.ru: опыт запуска внутреннего SRE-комьюнити и четыре разговора с бизнесом, без которых оно остаётся кружком по интересам.

## Выступления и лекции

- **Avito TechPR DrinkUP** — «Запуск внутреннего SRE-комьюнити», внутреннее мероприятие Авито. Саму презентацию отдаю индивидуально по запросу, публичные материалы к докладу — [в канале](https://t.me/jtprogru_channel/4433). Тему я потом развернул сильно шире доклада в [статье на DevRel.ru](https://devrel.ru/komuniti-zhivet-esli-rabota).
- **РТУ МИРЭА** — «Личная база знаний. Что это за зверь такой…», лекция для студентов, 2025. [Слайды открыты](https://jtprogru.github.io/pkbd/): путь от данных к информации, знанию и impact, инструменты и плагины Obsidian, методики Zettelkasten и PARA, и почему заводить базу стоит сейчас, а не когда-нибудь потом.

## Подкаст «В SREду на кухне»

Подкаст Avito, восемь выпусков с моим участием. Целиком плейлистом — на [YouTube](https://www.youtube.com/playlist?list=PLknJ4Vr6efQGz5LIO9taObaoNK_Mld6F4) и во [VK Видео](https://vkvideo.ru/playlist/-152990965_43).

- #1 SLO, инциденты и прод: где заканчивается DevOps и начинается SRE — [YouTube](https://youtu.be/OOWxI_dKTWI), [VK Видео](https://vkvideo.ru/video-152990965_456240023)
- #2 Почему ваш мониторинг врет? SRE об алертах и наблюдаемости — [YouTube](https://youtu.be/WyT9ni4mGtU), [VK Видео](https://vkvideo.ru/video-152990965_456240051)
- #3 Почему Kubernetes не бесплатный? Что лучше: опенсорс, облако, вендор — [YouTube](https://youtu.be/76_IJFOIFLA), [VK Видео](https://vkvideo.ru/video-152990965_456240071)
- #4 SRE больше не нужны. AI переписал правила — [YouTube](https://youtu.be/adDzAPLy4Ww), [VK Видео](https://vkvideo.ru/video-152990965_456240096)
- #5 Внутренняя кухня SRE и информационной безопасности — [YouTube](https://youtu.be/w2O5jzAO8BU), [VK Видео](https://vkvideo.ru/video-152990965_456240132)
- #6 Chaos Engineering: роняем прод, чтобы стать сильнее — [YouTube](https://youtu.be/UeZtZMeonnY), [VK Видео](https://vkvideo.ru/video-152990965_456240194)
- #7 Error Budget: зачем продукту бюджет ошибок? — [YouTube](https://youtu.be/pz0QkReLxMY), [VK Видео](https://vkvideo.ru/video-152990965_456240226)
- #14 Digital Immune System: мониторинга, SRE и автотестов уже недостаточно — [YouTube](https://youtu.be/rT3ua0w_CCw), [VK Видео](https://vkvideo.ru/video-152990965_456240458)

## Ещё публичное

- **[Программный комитет DevOpsConf](https://devopsconf.io/)** — состою в ПК конференции.
- **[The Way of SRE](https://jtprogru.github.io/The-Way-of-SRE/)** — открытый проект: подборка материалов и заметок для тех, кто развивается в SRE. Остальные pet-проекты — на странице [Проекты](/projects/).
- **[Менторство в GetMentor](https://getmentor.dev/mentor/jtprogru)** — помогаю менти двигаться по их задачам, а себе прокачиваю коммуникацию.
- **[Преподавание в РТУ МИРЭА](https://www.mirea.ru)** — иногда читаю студентам, которые только заходят в инфраструктуру и SRE.
