

// function Export2Doc(element, filename = '') {
//     var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
//     var postHtml = "</body></html>";
//     var html = preHtml + document.getElementById(element).innerHTML + postHtml;

//     var blob = new Blob(['\ufeff', html], {
//         type: 'application/msword'
//     });

//     // Specify link url
//     var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

//     // Specify file name
//     filename = filename ? filename + '.doc' : 'document.doc';

//     // Create download link element
//     var downloadLink = document.createElement("a");

//     document.body.appendChild(downloadLink);

//     if (navigator.msSaveOrOpenBlob) {
//         navigator.msSaveOrOpenBlob(blob, filename);
//     } else {
//         // Create a link to the file
//         downloadLink.href = url;

//         // Setting the file name
//         downloadLink.download = filename;

//         //triggering the function
//         downloadLink.click();
//     }

//     document.body.removeChild(downloadLink);
// }
var base64Img = null;
imgToBase64('octocat.jpg', function (base64) {
    base64Img = base64;
});

margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
};

generate = function () {
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(18);
    pdf.fromHTML(document.getElementById('html-2-pdfwrapper'),
        margins.left, // x coord
        margins.top,
        {
            // y coord
            width: margins.width// max width of content on PDF
        }, function (dispose) {
            headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
        },
        margins);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    document.body.appendChild(iframe);

    iframe.src = pdf.output('datauristring');
};
function headerFooterFormatting(doc, totalPages) {
    for (var i = totalPages; i >= 1; i--) {
        doc.setPage(i);
        //header
        header(doc);

        footer(doc, i, totalPages);
        doc.page++;
    }
};

function header(doc) {
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle('normal');

    if (base64Img) {
        doc.addImage(base64Img, 'JPEG', margins.left, 10, 40, 40);
    }

    doc.text("Report Header Template", margins.left + 50, 40);
    doc.setLineCap(2);
    doc.line(3, 70, margins.width + 43, 70); // horizontal line
};

// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {

    if (!window.FileReader) {
        callback(null);
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            imgVariable = reader.result.replace('text/xml', 'image/jpeg');
            callback(imgVariable);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
};

function footer(doc, pageNumber, totalPages) {

    var str = "Page " + pageNumber + " of " + totalPages

    doc.setFontSize(10);
    doc.text(str, margins.left, doc.internal.pageSize.height - 20);

};