const pugpdf = require('pug-pdf'),
   fs = require('fs');

fs.createReadStream('src/pug/index.pug')
  .pipe(pugpdf({
    cssPath: 'src/scss/style.scss',
    paperOrientation: 'landscape',
    paperBorder: '1cm'
  }))
  .pipe(fs.createWriteStream('dist/cv.pdf'));
