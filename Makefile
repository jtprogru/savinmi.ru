SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

BUN ?= bun
NPM ?= npm
PORT ?= 4321
LINT_GLOBS := 'src/pages/*.md' 'README.md'

## Дизайн-система «Мишка на сервере» — сабмодуль. В npm её нет, dist/ в её
## репозитории не коммитится, поэтому CSS собирается здесь, её собственным
## npm: тянуть esbuild и react в bun-лок сайта незачем.
MISHKA_DS ?= vendor/mishka-ds
DS_BUNDLE := $(MISHKA_DS)/dist/styles/index.css

## В CI ставим строго по локу, локально — даём подтянуть свежедобавленное.
INSTALL_FLAGS := $(if $(CI),--frozen-lockfile,)

.PHONY: help install ds dev build preview lint check dependency-snapshot clean distclean

help: ## Показать список целей
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

## Зависимости ставятся только когда package.json или bun.lock новее node_modules.
node_modules: package.json bun.lock
	$(BUN) install $(INSTALL_FLAGS)
	@touch node_modules

install: node_modules ## Установить зависимости

## Сабмодуль мог приехать пустым: клонировали без --recurse-submodules.
$(MISHKA_DS)/package.json:
	git submodule update --init --recursive

$(MISHKA_DS)/node_modules: $(MISHKA_DS)/package.json $(MISHKA_DS)/package-lock.json
	$(NPM) --prefix $(MISHKA_DS) ci
	@touch $(MISHKA_DS)/node_modules

## Сборка пакета гоняет и проверку контрастов: если правка токенов уронила
## пару ниже AA, сайт не соберётся — и это правильное поведение.
ds: $(MISHKA_DS)/node_modules ## Собрать дизайн-систему из сабмодуля
	$(NPM) --prefix $(MISHKA_DS) run build

$(DS_BUNDLE): ds

dev: node_modules $(DS_BUNDLE) ## Запустить dev-сервер
	$(BUN) run dev --port $(PORT)

build: node_modules $(DS_BUNDLE) ## Собрать статический сайт в ./dist
	$(BUN) run build

preview: build ## Посмотреть прод-сборку локально
	$(BUN) run preview --port $(PORT)

lint: node_modules ## Проверить markdown
	$(BUN) run markdownlint-cli2 $(LINT_GLOBS)

check: lint build ## Полная проверка: линт и сборка

dependency-snapshot: node_modules ## Собрать снапшот дерева зависимостей для GitHub
	$(BUN) scripts/bun-dependency-snapshot.mjs > dependency-snapshot.json

clean: ## Удалить артефакты сборки
	rm -rf ./dist ./.astro ./dependency-snapshot.json $(MISHKA_DS)/dist

distclean: clean ## Удалить артефакты и зависимости
	rm -rf ./node_modules $(MISHKA_DS)/node_modules
