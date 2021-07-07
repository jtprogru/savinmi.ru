function printer() {
    const content = window.document.querySelector('#content');
    const opt = {
        margin:       0,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        filename:     'CV_Savin_MI.pdf',
        enableLinks:  true,
        jsPDF:        { unit: 'mm', format: 'A4', orientation: 'landscape' },
        pagebreak: {
            mode:     'legacy',
            after:    '.pdf-break-after',
            before:   '.pdf-break-before',
            avoid:    '.social-icon'
        }
    };
    html2pdf().set(opt).from(content).save();
}
