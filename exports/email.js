/**
 * email file for tamaramack.github.io on 11-Apr-17.
 */
const nodemailer = require('nodemailer');

module.exports = function sendEmailerNotifier(req, res) {
    //https://github.com/andris9/Nodemailer
    var date = new Date();
    var datetime = date.toDateString() + ' ' + date.toTimeString();
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nd.vidreq@gmail.com",
            pass: "nbcnewsvideo"
        }
    });

    var mailOptions = {
        from: "nd.vidreq@gmail.com", // sender address
        to: "nd.vidreq@gmail.com", // list of receivers
        subject: "This is a Test: " + datetime, // Subject line
        text: "Hello world, This is test.  Please ignore.", // plaintext body
        html: req.query.html
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + info.response);
            res.end("sent");
        }
    });
};
