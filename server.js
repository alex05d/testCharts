var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8000;

// var HTML = require("./views/index.html");
// var router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


require("./routes/html_routes")(app);
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "../views/index.html"));
// });
// "use strict";
// const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     host: "localhost",
//     port: 1025,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'project.1', // generated ethereal user
//         pass: 'secret.1' // generated ethereal password
//     }
// });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hackathon ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>",
//         // html body
//         amp: `<!doctype html>
//    <html ⚡4email>
//    <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <script src="https://code.highcharts.com/highcharts.js"></script>
//     <script src="./javascript/jspdf.min.js"></script>
//     <script src="./javascript/chart.js"></script>
//     <script src="./javascript/doc_gen.js"></script>
//     <title>HighCarts</title>
// </head>

// <body>
//     <button onclick="generate()">Generate PDF</button>
//     <div class="container-fluid" id="exportContent">

//         <div id="container" style="width:80%; height:400px;"></div>

//         <div id="barChart" style="width:50%; height: 300px"></div>

//         <div id="spline" style="width:50%; height: 300px"></div>

//         <div id="pie" style="width:90%; height: 600px"></div>

//     </div>
// </body>
// </html>`
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);


app.listen(PORT, function () {
    console.log('App running on port ' + PORT + '!');
});