var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
var app = express()


// thiet lap views va public
var dirname = __dirname
var notRoutes = dirname.split('/')
notRoutes = notRoutes.filter(function(x) {
    return x != 'routes'
})
var file = ''
notRoutes.forEach(element => {
    file = file + element
    file = file + '/'
});
var views = file + 'views'
var public = file + 'public'


app.set('views', views);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(public));

var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

app.post('/', function(req, res) {
    var confirm = req.body.confirm
    var username = req.body.username
    var password = req.body.password
    var fullname = req.body.username
    var email = req.body.email

    // kiem tra email da ton tai chua
    connection.query("SELECT accounts.email from accounts where email = ?", email, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            if (results.length > 0) {
                // neu da ton tai email
                res.render('login', { thongBao: 'Error register, email already exists!', color: 'red' })
            } else {
                // neu chua ton tai
                // kiem tra password confirm co bang password hay khong
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
                            res.render('login', { thongBao: 'Error register', color: 'red' })
                        } else {
                            // thong bao thanh cong
                            res.render('login', { thongBao: 'Success register, please login.', color: 'green' })
                        }
                    })

                } else {
                    res.render('login', { thongBao: 'Error register, password confirm incorrect!', color: 'red' })
                }
            }
        }
    })


});
module.exports = app;