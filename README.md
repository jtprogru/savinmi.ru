# [savinmi.ru](https://savinmi.ru)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jtprogru/savinmi.ru/CI?label=CI)
![GitHub](https://img.shields.io/github/license/jtprogru/savinmi.ru)

My personal CV builded with:

- [Resume](https://startbootstrap.com/theme/resume/)
- [Bootstrap](https://getbootstrap.com/)
- [Freehostia](https://www.freehostia.com/free-cloud-hosting/)

### Basic Usage

After downloading, simply edit the HTML and CSS files included with `dist` directory. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

Clone the source files of the theme and navigate into the theme's root directory. Run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `package.json` file to see which scripts are included.

#### npm Scripts

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
For basic deploy used personal GitHub Actions – [jtprogru/ftp-deployment-action](https://github.com/jtprogru/ftp-deployment-action). Add this secrets to repository secrets:
- `FTP_SERVER` – FTP-server;
- `FTP_USERNAME` – login for FTP access to FTP-server;
- `FTP_PASSWORD` – password for FTP access to FTP-server;

## Author

This repo has been created by:
- @jtprogru
- @gaskob
