# Repo for my CV

[![CodeQL](https://github.com/jtprogru/savinmi.ru/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jtprogru/savinmi.ru/actions/workflows/codeql-analysis.yml)
![Vercel](https://badgen.net/badge/icon/vercel?icon=vercel&label)
[![Website](https://img.shields.io/website?label=My%20CV&url=https%3A%2F%2Fsavinmi.ru)](https://savinmi.ru)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jtprogru/savinmi.ru/CI?label=CI)
![GitHub](https://img.shields.io/github/license/jtprogru/savinmi.ru)

My personal CV builded with:

- [Resume](https://startbootstrap.com/theme/resume/)
- [Bootstrap](https://getbootstrap.com/)
- [Vercel](https://vercel.com/)

## Develop

```shell
# Clone this repo
> git clone https://github.com/jtprogru/savinmi.ru
> cd savinmi.ru

# Install NPM packages
> make install-deps

# Run project in DEBUG mode
> make start-debug

# Open src/pug/index.pug in any editor
> vim src/pug/index.pug
# And have a fun!

# For more info about command run make
> make
Available rules:

assets              Build assets
build               Build project
clean               Clean all artifacts
del-mod             Delete node_modules and dist dirs
help                Show this help message
install-deps        Install all dependencies
pdf                 Render PDF
pug                 Build assets
scripts             Build scripts
scss                Build scss
start               Run project in PRODUCTION mode
start-debug         Run project in DEBUG mode
```

### npm Scripts

- `npm run build` builds the project - this builds assets, HTML, JS, and CSS into `dist`
- `npm run build:assets` copies the files in the `src/assets/` directory into `dist`
- `npm run build:pug` compiles the Pug located in the `src/pug/` directory into `dist`
- `npm run build:scripts` brings the `src/js/scripts.js` file into `dist`
- `npm run build:scss` compiles the SCSS files located in the `src/scss/` directory into `dist`
- `npm run clean` deletes the `dist` directory to prepare for rebuilding the project
- `npm run start:debug` runs the project in debug mode
- `npm start` or `npm run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

You must have `npm` installed in order to use this build environment.

## Deploy

The deployment occurs automatically by commit to the main branch due to the fact that this repository is connected to the project in Vercel.

## Author

This repo has been created by:

- [@jtprogru](https://github.com/jtprogru)
- [@gaskob](https://github.com/gaskob)
