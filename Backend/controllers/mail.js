require("dotenv").config();
var nodemailer = require("nodemailer");

function sendEmail(to, otp) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mayank.tempdata@gmail.com",
      pass: process.env.EMAILPASSWORD,
    },
  });
  var str = "your otp = ";
  var a = otp;
  str += a;
  str += "\notp valid till 2min";
  var mailOptions = {
    from: "mayank.tempdata@gmail.com",
    to: to,
    // cc:cc,
    subject: "Reset Password TestInn!!",
    text: str,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendEmail;
