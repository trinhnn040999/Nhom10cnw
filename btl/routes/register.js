var express = require('express')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
var router = express.Router();
var app = express()


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

router.post('/', function(req, res) {
    var confirm = req.body.confirm
    var username = req.body.username
    var password = req.body.password
    var fullname = req.body.username
    var email = req.body.email

    connection.query("SELECT accounts.email from accounts where email = ?", email, (error, results, fields) => {
        c
    })

    if (confirm === password) {
        var user = {
                'username': username,
                'password': password,
                'email': email,
                'fullname': fullname,
            }
            // them thong tin vao co so du lieu
        connection.query('INSERT INTO accounts SET ?', user, function(error, results, fields) {
            // neu co loi xay ra
            if (error) {
                // thong bao loi
                res.render('login', { thongBao: 'Error register, email already exists!', color: 'red' })
            } else {
                // thong bao thanh cong
                res.render('login', { thongBao: 'Success register, please login.', color: 'green' })
            }
        })

    } else {
        res.render('login', { thongBao: 'Error register, password confirm incorrect!', color: 'red' })
    }
});
module.exports = router;