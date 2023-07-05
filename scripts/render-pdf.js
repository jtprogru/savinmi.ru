'use strict';
const puppeteer = require('puppeteer')

module.exports = async function curlPdf() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://savinmi.ru', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ format: 'A4', scale: 0.6 });

    await browser.close();
    return pdf
  };
