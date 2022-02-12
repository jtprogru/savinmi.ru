SHELL := /bin/bash
.SILENT:
.DEFAULT_GOAL := help

SYS_NPM=$(shell which npm)
SYS_NODE=$(shell which node)
NODE_MODULES=node_modules

# "start:debug": "npm run build && node scripts/start-debug.js"

.PHONY: install-deps
## Install all dependencies
install-deps: package.json
	$(SYS_NPM) install

.PHONY: build
## Build project
build: clean pug scss scripts assets

.PHONY: assets
## Build assets
assets:
	$(SYS_NODE) scripts/build-assets.js

.PHONY: assets
## Build assets
pug:
	$(SYS_NODE) scripts/build-pug.js

.PHONY: scripts
## Build scripts
scripts:
	$(SYS_NODE) scripts/build-scripts.js

.PHONY: scss
## Build scss
scss:
	$(SYS_NODE) scripts/build-scss.js

.PHONY: start
## Run project in PRODUCTION mode
start:
	make build
	$(SYS_NODE) scripts/start.js

.PHONY: start-debug
## Run project in DEBUG mode
start-debug:
	make build
	$(SYS_NODE) scripts/start-debug.js

.PHONY: clean
## Clean all artifacts
clean:
	$(SYS_NODE) scripts/clean.js

.PHONY: help
## Show this help message
help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)"
	@echo
	@sed -n -e "/^## / { \
		h; \
		s/.*//; \
		:doc" \
		-e "H; \
		n; \
		s/^## //; \
		t doc" \
		-e "s/:.*//; \
		G; \
		s/\\n## /---/; \
		s/\\n/ /g; \
		p; \
	}" ${MAKEFILE_LIST} \
	| LC_ALL='C' sort --ignore-case \
	| awk -F '---' \
		-v ncol=$$(tput cols) \
		-v indent=19 \
		-v col_on="$$(tput setaf 6)" \
		-v col_off="$$(tput sgr0)" \
	'{ \
		printf "%s%*s%s ", col_on, -indent, $$1, col_off; \
		n = split($$2, words, " "); \
		line_length = ncol - indent; \
		for (i = 1; i <= n; i++) { \
			line_length -= length(words[i]) + 1; \
			if (line_length <= 0) { \
				line_length = ncol - indent - length(words[i]) - 1; \
				printf "\n%*s ", -indent, " "; \
			} \
			printf "%s ", words[i]; \
		} \
		printf "\n"; \
	}' \
	| more $(shell test $(shell uname) == Darwin && echo '--no-init --raw-control-chars')
