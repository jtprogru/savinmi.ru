# Repo for my CV

[![CodeQL](https://github.com/jtprogru/savinmi.ru/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jtprogru/savinmi.ru/actions/workflows/codeql-analysis.yml)
![Vercel](https://badgen.net/badge/icon/vercel?icon=vercel&label)
[![Website](https://img.shields.io/website?label=My%20CV&url=https%3A%2F%2Fsavinmi.ru)](https://savinmi.ru)
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
> task install

# Run project in DEBUG mode
> task serve

# Open src/pug/index.pug in any editor
> vim src/pug/index.pug
# And have a fun!

# For more info about command run `task`:
> task
task: Available tasks for this project:
* assets:        Build assets
* audit:         Run npm audit
* build:         Build project
* fix:           Run npm audit fix
* fund:          Run npm fund
* install:       Install all dependencies
* pdf:           Build pdf
* pug:           Build pug
* scripts:       Build scripts
* scss:          Build SCSS
* serve:         Serve in DEBUG mode
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
- [@toadirog](https://github.com/toadirog)


## Project Status

![Alt](https://repobeats.axiom.co/api/embed/756a29300a8e26177ac33e822231f633f2efebca.svg "Repobeats analytics image")

