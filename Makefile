SHELL := /bin/bash
.SILENT:
.DEFAULT_GOAL := help

SYS_NPM=$(shell which npm)
SYS_NODE=$(shell which node)

.PHONY: install-deps
## Install all dependencies
install-deps: package.json
	$(SYS_NPM) install

.PHONY: fund
## Run npm fund
fund:
	$(SYS_NPM) fund

.PHONY: audit
## Run npm audit
audit:
	$(SYS_NPM) audit

.PHONY: audit-fix
## Run npm audit fix
audit-fix:
	$(SYS_NPM) audit fix

.PHONY: build
## Build project
build: pug scss scripts assets

.PHONY: assets
## Build assets
assets:
	$(SYS_NODE) scripts/build-assets.js

.PHONY: pug
## Build pug
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
start: build
	$(SYS_NODE) scripts/start.js

.PHONY: start-debug
## Run project in DEBUG mode
start-debug: build
	$(SYS_NODE) scripts/start-debug.js

.PHONY: clean
## Clean all artifacts
clean:
	rm -rf node_modules/ dist/

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
