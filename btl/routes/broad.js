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
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));

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

app.post('/createTodo', function(req, res, next) {
    var titleName = req.body.titleName
    var id_broad = req.cookies.id_broad
    var title = {
        'id': id_broad,
        'title': titleName
    }
    if (title['title'].length == 0) {
        res.render('broad', { fullname: req.cookies.fullname })
    } else {
        connection.query('INSERT INTO title SET ?', title, function(error, results, fields) {
            if (error) throw error
            else {
                console.log('insert title success!')
                res.render('broad', { fullname: req.cookies.fullname })
            }
        })
    }

})

app.post('/createCard/:id_title', function(req, res, next) {
    var id_title = req.params.id_title
    var card = {
        'id_card': id_title,
        'text_card': req.body.textCard
    }
    if (card['text_card'].length == 0) {
        res.render('broad', { fullname: req.cookies.fullname })
    } else {
        connection.query('INSERT INTO card SET ?', card, function(error, results, fields) {
            if (error) throw error
            else {
                console.log('insert card title success!')
                res.render('broad', { fullname: req.cookies.fullname })
            }
        })
    }

})


module.exports = app;