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

app.get('/', function(req, res, next) {
    connection.query("SELECT * from broad where email = ?", 'nguyenthithuan1591999@gmail.com', (error, results, fields) => {

        var id = results[0]['id']
        connection.query("SELECT * from title where id = ?", id, (error, results, fields) => {

            results.forEach(element => {
                var id_card = element['id_card']
                connection.query("SELECT * from card where id_card = ?", id_card, (error, results, fields) => {
                    res.json(results)
                });
            });
        });
    });
})

module.exports = app;