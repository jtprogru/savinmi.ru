'use strict';
const fs = require('fs');
const upath = require('upath');
const curlPdf = require('./render-pdf');

const destPdfPath = "../src/assets/pdf/CV-SavinMI-SRE.pdf";

_processPdfFile(destPdfPath);

async function _processPdfFile(destPdfPath) {
    const pdfFilePath = upath.resolve(upath.dirname(__filename), destPdfPath);
    const pdf = await curlPdf();
    fs.writeFileSync(pdfFilePath, pdf);
}

