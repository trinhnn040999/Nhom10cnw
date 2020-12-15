var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var router = express.Router();
var app = express()


app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));


// app.get('/', function(req, res) {
//     req.logout();
//     res.clearCookie("username");
//     res.clearCookie("fullname");
//     res.clearCookie("email");
//     res.clearCookie("sdt");
//     res.redirect('/');
// });

var nodemailer = require('nodemailer');
const { render } = require('./register')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'congnghewebnhom10@gmail.com',
        pass: 'congngheweb10'
    }
});

function send_email(taikhoan, matkhau) {
    var mailOptions = {
        from: 'congnghewebnhom10@gmail.com',
        to: taikhoan,
        subject: 'This is your new password',
        text: matkhau
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/', function(req, res) {
    var email = req.body.email
    var password = req.cookies['password']
    send_email(email, password)
    res.render("login", { thongBao: '', color: 'red' })
});

module.exports = app;