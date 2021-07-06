function printer() {
    console.log("HELLO!")

    document.onclick('printer',function(){
        var element = document.querySelector("html");
        var opt = {
            margin:       1,
            filename:     'CV-SavinMI.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'A4', orientation: 'landscape' }
          };


          // New Promise-based usage:
          html2pdf().set(opt).from(element).save();


        })
}


// document.getElementById('button1').onclick = function()
// {
// alert('Нажата кнопка');
// }

// var btns = document.querySelector('тут твоя штука')

// btn.addEventListener('click', function(e) {
//     console.log('Button clicked' + e.target.classList);
//   })
