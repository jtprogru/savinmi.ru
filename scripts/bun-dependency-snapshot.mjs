#!/usr/bin/env bun
/**
 * Собирает snapshot дерева зависимостей из bun.lock для GitHub Dependency
 * Submission API и печатает его в stdout.
 *
 * Зачем: граф зависимостей GitHub не умеет читать bun.lock, поэтому после
 * переезда с npm в нём остаются только прямые зависимости из package.json,
 * а алерты по транзитивным CVE перестают приходить. Снапшот возвращает
 * полное дерево.
 *
 * Использование:
 *   bun scripts/bun-dependency-snapshot.mjs > snapshot.json
 *   gh api repos/:owner/:repo/dependency-graph/snapshots --input snapshot.json
 *
 * Переменные окружения (в CI приходят от GitHub Actions, локально — заглушки):
 *   GITHUB_SHA, GITHUB_REF, GITHUB_RUN_ID, GITHUB_WORKFLOW, GITHUB_JOB
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const LOCKFILE = "bun.lock";
const DETECTOR_VERSION = "1.0.0";

/**
 * bun.lock — это JSONC: висячие запятые перед } и ]. JSON.parse их не ест,
 * поэтому убираем, аккуратно пропуская содержимое строк и escape-последовательности.
 */
function parseJsonc(text) {
  let out = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      out += ch;
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }

    if (ch === '"') {
      inString = true;
      out += ch;
      continue;
    }

    if (ch === ",") {
      // висячая запятая, если дальше по тексту только пробелы до } или ]
      const rest = text.slice(i + 1);
      const next = rest.match(/^\s*([}\]])/);
      if (next) continue;
    }

    out += ch;
  }

  return JSON.parse(out);
}

/** "@astrojs/sitemap@3.7.3" -> { name: "@astrojs/sitemap", version: "3.7.3" } */
function splitIdent(ident) {
  const at = ident.lastIndexOf("@");
  if (at <= 0) return { name: ident, version: "" };
  return { name: ident.slice(0, at), version: ident.slice(at + 1) };
}

/** purl для npm: скоуп становится namespace, "@" в нём процент-кодируется. */
function toPurl(name, version) {
  const encoded = name.startsWith("@")
    ? `%40${encodeURIComponent(name.slice(1, name.indexOf("/")))}/${encodeURIComponent(name.slice(name.indexOf("/") + 1))}`
    : encodeURIComponent(name);
  return version ? `pkg:npm/${encoded}@${version}` : `pkg:npm/${encoded}`;
}

function env(name, fallback) {
  const v = process.env[name];
  return v && v.length ? v : fallback;
}

function localSha() {
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "0".repeat(40);
  }
}

function localRef() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
    return `refs/heads/${branch}`;
  } catch {
    return "refs/heads/main";
  }
}

const lock = parseJsonc(readFileSync(LOCKFILE, "utf8"));
const root = lock.workspaces?.[""] ?? {};
const directRuntime = new Set(Object.keys(root.dependencies ?? {}));
const directDev = new Set(Object.keys(root.devDependencies ?? {}));

const resolved = {};

for (const [key, entry] of Object.entries(lock.packages ?? {})) {
  if (!Array.isArray(entry) || typeof entry[0] !== "string") continue;

  const { name, version } = splitIdent(entry[0]);
  if (!name) continue;

  // Ключ в bun.lock бывает вложенным путём вида "a/b" — реальное имя берём
  // из идентификатора, а прямой зависимостью считаем только верхний уровень.
  const isTopLevel = !key.includes("/") || key.startsWith("@");
  const isDirectRuntime = isTopLevel && directRuntime.has(name);
  const isDirectDev = isTopLevel && directDev.has(name);

  const id = `${name}@${version}`;
  if (resolved[id]) continue;

  resolved[id] = {
    package_url: toPurl(name, version),
    relationship: isDirectRuntime || isDirectDev ? "direct" : "indirect",
    scope: isDirectDev ? "development" : "runtime",
  };
}

const snapshot = {
  version: 0,
  sha: env("GITHUB_SHA", localSha()),
  ref: env("GITHUB_REF", localRef()),
  job: {
    correlator: `${env("GITHUB_WORKFLOW", "local")}-${env("GITHUB_JOB", "dependency-graph")}`,
    id: env("GITHUB_RUN_ID", "local"),
  },
  detector: {
    name: "bun-lock-to-snapshot",
    version: DETECTOR_VERSION,
    url: "https://github.com/jtprogru/savinmi.ru/blob/main/scripts/bun-dependency-snapshot.mjs",
  },
  scanned: new Date().toISOString(),
  manifests: {
    [LOCKFILE]: {
      name: LOCKFILE,
      file: { source_location: LOCKFILE },
      resolved,
    },
  },
};

process.stdout.write(JSON.stringify(snapshot, null, 2));
