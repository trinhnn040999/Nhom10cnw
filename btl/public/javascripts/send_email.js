var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'congnghewebnhom10@gmail.com',
      pass: 'congngheweb10'
    }
  });
  function send_email(taikhoan, matkhau)
  {
      var mailOptions = {
          from: 'congnghewebnhom10@gmail.com',
          to : taikhoan,
          subject: 'This is your new password',
          text: matkhau
      };
      transporter.sendMail(mailOptions,function(error, info){
          if(error) {
              console.log(error);
          }else{
              console.log('Email sent: '+ info.response);
          }
      });
  }
module.exports.send_email = send_email;