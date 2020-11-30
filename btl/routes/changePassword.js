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


app.post('/', function(req, res, next) {
    var passwordOld = req.body.passwordOld
    var passwordNew = req.body.passwordNew
    var email = req.cookies.email
    var confirm = req.body.confirm

    connection.query('SELECT accounts.password FROM accounts WHERE email = ?', email, function(error, results, fields) {
        // neu khong thanh cong
        if (error) throw error;

        var password = results[0]['password']
        console.log(password)
        console.log(results)
            // kiem tra password co giong password old khong
        if (password === passwordOld) {
            // neu bang kiem tra tiep password confirm co bang password new khong
            if (confirm === passwordNew) {
                // neu bang thi update du lieu
                connection.query('update accounts set password = ? where email = ?', [passwordNew, email], function(error, results) {
                    // neu khong thanh cong
                    if (error) throw Error
                        // neu thanh cong
                })
                res.render('login', { thongBao: 'Please login again to confirm', color: 'green' })
            } else {
                // neu khong bang thong bao loi
                res.render('profile', {
                    fullname: req.cookies.fullname,
                    email: req.cookies.email,
                    sdt: req.cookies.sdt,
                    profile: '',
                    activity: 'active',
                    card: '',
                    setting: '',
                    err: 'Password confirm incorrect, please try again!',
                    classProfile: 'container tab-pane fade',
                    classActivity: 'tab-pane active'
                })
            }
        } else {
            // password khong giong password old 
            res.render('profile', {
                fullname: req.cookies.fullname,
                email: req.cookies.email,
                sdt: req.cookies.sdt,
                profile: '',
                activity: 'active',
                card: '',
                setting: '',
                err: 'Password incorrect, please try again!',
                classProfile: 'container tab-pane fade',
                classActivity: 'tab-pane active'
            })
        }

    });

});

module.exports = app;