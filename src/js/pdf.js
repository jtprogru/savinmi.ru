import { html } from "pdf-from";




function printer() {

const template = "src/pug/index.pug";
res.render(template, structuredData, async (err, htmlString) => {
    const applicationPdf = await html(document.getElementsByTagName('html')[0].innerHTML);
    if (applicationPdf && Buffer.isBuffer(applicationPdf)) {
        res.type("application/pdf");
        res.send(applicationPdf);
    } else {
        res.status(404).send("PDF not found");
    }
});

};

//- Using an anonymous function:
// document.getElementById("printer").onclick = printer();


// var el = document.getElementById("printer");
// if (el.addEventListener)
//     el.addEventListener("click", printer, false);
// else if (el.attachEvent)
//     el.attachEvent('onclick', printer);

// console.log(document.getElementsByTagName('html')[0].innerHTML);
