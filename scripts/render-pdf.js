const pugpdf = require('pug-pdf'),
   fs = require('fs');

fs.createReadStream('src/pug/index.pug')
  .pipe(pugpdf({
    cssPath: 'dist/css/style.css',
    paperOrientation: 'landscape',
    paperBorder: '1cm'
  }))
  .pipe(fs.createWriteStream('dist/CV_SavinMI.pdf'));
