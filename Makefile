SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

BUN ?= bun
PORT ?= 4321
LINT_GLOBS := 'src/pages/*.md' 'README.md'

.PHONY: help install dev build preview lint check clean distclean

help: ## Показать список целей
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

## Зависимости ставятся только когда package.json или bun.lock новее node_modules.
node_modules: package.json bun.lock
	$(BUN) install --frozen-lockfile
	@touch node_modules

install: node_modules ## Установить зависимости

dev: node_modules ## Запустить dev-сервер
	$(BUN) run dev --port $(PORT)

build: node_modules ## Собрать статический сайт в ./dist
	$(BUN) run build

preview: build ## Посмотреть прод-сборку локально
	$(BUN) run preview --port $(PORT)

lint: node_modules ## Проверить markdown
	$(BUN) run markdownlint-cli2 $(LINT_GLOBS)

check: lint build ## Полная проверка: линт и сборка

clean: ## Удалить артефакты сборки
	rm -rf ./dist ./.astro

distclean: clean ## Удалить артефакты и зависимости
	rm -rf ./node_modules
