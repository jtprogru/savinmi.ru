function printer() {
  const content = window.document.querySelector('#content');
  const opt = {
    filename: 'MSavin_cv.pdf',
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
    pagebreak: { after: '.pdf-break-after', before: '.pdf-break-before', avoid: 'hr.m-0.first'}
  };
  html2pdf().set(opt).from(content).save();
}