var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
const { render } = require('./register')
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

// app.get('/', function(req, res, next) {
//     // render('broad', { fullname: req.cookies['fullname'] })
// })

app.get('/:id', function(req, res, next) {
    res.cookie('id_broad', req.params.id)
    res.render('broad', { fullname: req.cookies.fullname })
})


module.exports = app;