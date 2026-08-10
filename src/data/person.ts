/**
 * Единственный источник правды о сущности «Михаил Савин».
 *
 * Используется и в JSON-LD (src/components/Seo.astro), и в футере
 * (src/components/Footer.astro) — чтобы списки профилей не расходились.
 */

export const SITE = "https://savinmi.ru";

export const NAME = "Михаил Савин";
export const NAME_LATIN = "Mikhail Savin";

/** Строка под именем в шапке главной. */
export const ROLE_LINE = "Lead SRE · руководитель отдела SRE";

/** Стабильные идентификаторы узлов графа. Менять нельзя — на них ссылаются. */
export const ID = {
  person: `${SITE}/#person`,
  website: `${SITE}/#website`,
  profile: `${SITE}/#profilepage`,
  image: `${SITE}/#primaryimage`,
  h3llo: `${SITE}/#org-h3llo`,
} as const;

export type Social = {
  href: string;
  label: string;
  icon: string;
  /** rel="me" — двусторонняя верификация личности */
  me?: boolean;
  /** не выводить в футере (в разметке остаётся) */
  hidden?: boolean;
  /** не выводить в sameAs (в футере остаётся) */
  offGraph?: boolean;
};

/**
 * Порядок = порядок иконок в футере.
 * Профили с hidden: true в футер не попадают, но идут в sameAs.
 */
export const SOCIALS: Social[] = [
  { href: "https://t.me/jtprogru_channel", label: "Telegram-канал «Мишка на сервере»", icon: "telegram" },
  { href: "https://github.com/jtprogru", label: "GitHub — jtprogru", icon: "github", me: true },
  { href: "https://habr.com/ru/users/jtprogru/", label: "Habr — публикации", icon: "habr" },
  { href: "https://twitter.com/jtprogru", label: "X / Twitter", icon: "x" },
  { href: "https://linkedin.com/in/jtprogru", label: "LinkedIn", icon: "linkedin" },
  { href: "https://mas.to/@jtprogru", label: "Mastodon", icon: "mastodon", me: true },
  { href: "https://leetcode.com/jtprogru/", label: "LeetCode", icon: "leetcode" },
  { href: "https://unsplash.com/@jtprogru", label: "Unsplash — фотографии", icon: "unsplash" },
  { href: "https://jtprog.ru", label: "Блог jtprog.ru (RSS)", icon: "rss" },
  { href: "https://sponsr.ru/jtprogru_channel/", label: "Поддержать", icon: "ruble" },
  { href: "/pdf/mikhail-savin-cv-sre.pdf", label: "Резюме Михаила Савина — Lead SRE (PDF)", icon: "cv", offGraph: true },

  // Ниже — только для sameAs, иконок в футере нет.
  { href: "https://t.me/jtprogru", label: "Telegram — личный аккаунт", icon: "", hidden: true },
  { href: "https://t.me/michael_behind_lens", label: "Telegram — Michael behind lens", icon: "", hidden: true },
  { href: "https://qna.habr.com/user/jtprogru", label: "Хабр Q&A", icon: "", hidden: true },
  { href: "https://jtprogru.github.io/The-Way-of-SRE/", label: "The Way of SRE", icon: "", hidden: true },
  { href: "https://getmentor.dev/mentor/michael-savin-1427", label: "GetMentor", icon: "", hidden: true },
  { href: "https://proitfest.ru/spikery-network-fest/mihailsavin/", label: "ProIT Fest — спикер", icon: "", hidden: true },
  { href: "https://setka.ru/users/717ccc6c-e042-45df-a94f-824e85e57926", label: "Сетка", icon: "", hidden: true },
  { href: "https://www.instagram.com/jtprogru", label: "Instagram", icon: "", hidden: true },
  { href: "https://me.jtprog.ru/", label: "Все ссылки", icon: "", hidden: true },

  // TODO добавить после того, как профили станут публичными / подтвердятся:
  //   https://career.habr.com/jtprogru  — сейчас закрыт настройками приватности
  //   https://jtprogru.mave.digital/    — подтвердить URL подкаста
  //   https://www.wikidata.org/wiki/Q…  — после создания элемента
];

/** Иконки для футера. */
export const FOOTER_SOCIALS = SOCIALS.filter((s) => !s.hidden);

/** sameAs: только абсолютные внешние URL, без PDF. */
export const SAME_AS = SOCIALS
  .filter((s) => !s.offGraph && s.href.startsWith("http"))
  .map((s) => s.href);

export const KNOWS_ABOUT = [
  "Site Reliability Engineering",
  "SRE",
  "DevOps",
  "Platform Engineering",
  "Kubernetes",
  "KubeVirt",
  "Terraform",
  "Ansible",
  "SaltStack",
  "Prometheus",
  "Grafana",
  "Observability",
  "SLO",
  "SLI",
  "Error Budget",
  "Incident Management",
  "Postmortem",
  "On-call",
  "Infrastructure as Code",
  "GitOps",
  "CI/CD",
  "Go",
  "Python",
  "Linux",
  "Yandex Cloud",
  "Надёжность",
  "Эксплуатация",
  "Управление инцидентами",
];
