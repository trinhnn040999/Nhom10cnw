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

app.post('/create_card', function(req, res, next) {
    var card = {
        'id_card': req.body.id_card,
        'text_card': req.body.text_card
    }
    connection.query('insert into card set ?', card, function(error, results, fields) {
        if (error) throw error
    })
})

app.post('/draggable', function(req, res, next) {
    var card = {
        'id': req.body.id.split('/')[1],
        'id_card': req.body.id_card
    }
    console.log(card['id_card'])
    console.log(card['id'])
    connection.query('UPDATE card set id_card=? where id=?', [card['id_card'], card['id']], (error, results, fields) => {
        if (error) throw error
        console.log('draggable success')
    })
})

app.post('/delete_card', function(req, res, next) {
    var id = req.body.id
    connection.query('delete from card where id =? ', id, (err, results, fields) => {
        if (err) throw err
        console.log('delete card success')
    })
})

module.exports = app;