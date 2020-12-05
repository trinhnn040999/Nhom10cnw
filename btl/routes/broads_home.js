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
    connection.query("SELECT broad.id, broad.email, broad.broadName, title.title, title.id_card, " +
        "card.text_card FROM broad, title, card WHERE broad.id = title.id " +
        "and card.id_card = title.id_card and broad.email = ?",
        req.cookies['email'], (error, results, fields) => {
            var task = []

            var id = {}
            var id_card = {}
            results.forEach(element => {
                id[element['id']] = 0
                id_card[element['id_card']] = 0
            });

            for (i in id) {
                var same_id = results.filter(function(x) {
                    return x['id'] == i
                })
                var obj = {}
                obj['id'] = i
                obj['email'] = same_id[0]['email']
                obj['broadName'] = same_id[0]['broadName']
                obj['title'] = []

                for (j in id_card) {
                    var same_id_card = same_id.filter(function(x) {
                            return x['id_card'] == j
                        })
                        // console.log(j)
                    var obj_title = {}

                    try {
                        obj_title['title'] = same_id_card[0]['title']
                        obj_title['id_card'] = same_id_card[0]['id_card']
                        obj_title['text_card'] = []
                        same_id_card.forEach(element => {
                            obj_title['text_card'].push(element['text_card'])
                        });
                        obj['title'].push(obj_title)
                    } catch {
                        continue
                    }
                }

                task.push(obj)
            }
            console.log(task)
            res.json(task)
        });
})


app.get('/broad', function(req, res, next) {
    connection.query("SELECT broad.id, broad.email, broad.broadName, title.title, title.id_card, " +
        "card.text_card FROM broad, title, card WHERE broad.id = title.id " +
        "and card.id_card = title.id_card and broad.email = ?",
        req.cookies['email'], (error, results, fields) => {
            var task = []

            var id = {}
            var id_card = {}
            results.forEach(element => {
                id[element['id']] = 0
                id_card[element['id_card']] = 0
            });

            for (i in id) {
                var same_id = results.filter(function(x) {
                    return x['id'] == i
                })
                var obj = {}
                obj['id'] = i
                obj['email'] = same_id[0]['email']
                obj['broadName'] = same_id[0]['broadName']
                obj['title'] = []

                for (j in id_card) {
                    var same_id_card = same_id.filter(function(x) {
                            return x['id_card'] == j
                        })
                        // console.log(j)
                    var obj_title = {}

                    try {
                        obj_title['title'] = same_id_card[0]['title']
                        obj_title['id_card'] = same_id_card[0]['id_card']
                        obj_title['text_card'] = []
                        same_id_card.forEach(element => {
                            obj_title['text_card'].push(element['text_card'])
                        });
                        obj['title'].push(obj_title)
                    } catch {
                        continue
                    }
                }
                task.push(obj)
            }
            task.forEach(element => {
                if (element['id'] == req.cookies['id_broad']) {
                    res.json(element)
                }
            });
        });
})

module.exports = app;