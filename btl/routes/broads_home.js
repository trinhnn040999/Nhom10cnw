var express = require('express')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../configuration/config')
var mysql = require('mysql');
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

app.get('/', function(req, res, next) {
    connection.query('SELECT broad.id, broad.email , broad.broadName, title.title FROM broad, title WHERE broad.id = title.id and broad.email = ? ',
        req.cookies['email'], (error, results, fields) => {
            let task = []
            var same_id = {}

            results.forEach(element => {
                same_id[element['id']] = 0
            });

            for (var id_ in same_id) {
                let obj_same_id = results.filter(function(x) {
                    return x['id'] == id_
                })
                let obj = {}
                obj['id'] = obj_same_id[0]['id']
                obj['broadName'] = obj_same_id[0]['broadName']
                task.push(obj)
            }

            res.json(task)

        });
})


// app.get('/broad', function(req, res, next) {
//     connection.query("SELECT broad.id, broad.email, broad.broadName, title.title, title.id_card, " +
//         "card.text_card FROM broad, title, card WHERE broad.id = title.id " +
//         "and card.id_card = title.id_card and broad.email = ?",
//         req.cookies['email'], (error, results, fields) => {
//             if (results.length == 0) {
//                 connection.query('SELECT broad.id, broad.email , broad.broadName, title.title FROM broad, title WHERE broad.id = title.id and broad.email = ? ',
//                     req.cookies['email'], (error, results, fields) => {
//                         let task = []
//                         var same_id = {}
//                         console.log(results)

//                         results.forEach(element => {
//                             same_id[element['id']] = 0
//                         });

//                         for (var id_ in same_id) {
//                             let obj_same_id = results.filter(function(x) {
//                                 return x['id'] == id_
//                             })
//                             let obj = {}
//                             obj['id'] = obj_same_id[0]['id']
//                             obj['broadName'] = obj_same_id[0]['broadName']
//                             obj['email'] = obj_same_id[0]['email']
//                             obj['title'] = []
//                             obj_same_id.forEach(element => {
//                                 let obj_title = {}
//                                 obj_title['title'] = element['title']
//                                 obj_title['id_card'] = ''
//                                 obj_title['text_card'] = []

//                                 obj['title'].push(obj_title)
//                             });
//                             task.push(obj)
//                         }
//                         task.forEach(element => {
//                             if (element['id'] == req.cookies['id_broad']) {
//                                 res.json(element)
//                             }
//                         });
//                     });
//             }
//             var task = []
//             var id = {}
//             var id_card = {}
//             results.forEach(element => {
//                 id[element['id']] = 0
//                 id_card[element['id_card']] = 0
//             });

//             for (i in id) {
//                 var same_id = results.filter(function(x) {
//                     return x['id'] == i
//                 })
//                 var obj = {}
//                 obj['id'] = i
//                 obj['email'] = same_id[0]['email']
//                 obj['broadName'] = same_id[0]['broadName']
//                 obj['title'] = []

//                 for (j in id_card) {
//                     var same_id_card = same_id.filter(function(x) {
//                             return x['id_card'] == j
//                         })
//                         // console.log(j)
//                     var obj_title = {}

//                     try {
//                         obj_title['title'] = same_id_card[0]['title']
//                         obj_title['id_card'] = same_id_card[0]['id_card']
//                         obj_title['text_card'] = []
//                         same_id_card.forEach(element => {
//                             obj_title['text_card'].push(element['text_card'])
//                         });
//                         obj['title'].push(obj_title)
//                     } catch {
//                         continue
//                     }
//                 }
//                 task.push(obj)
//             }
//             task.forEach(element => {
//                 if (element['id'] == req.cookies['id_broad']) {
//                     res.json(element)
//                 }
//             });
//         });
// })

// test api 

app.get('/test', function(req, res, next) {
    connection.query("SELECT broad.id, broad.email, broad.broadName, title.title, title.id_card, " +
        "card.text_card FROM broad, title, card WHERE broad.id = title.id " +
        "and card.id_card = title.id_card and broad.email = ?",
        'nguyenthithuan1591999@gmail.com', (error, results, fields) => {
            if (results.length == 0) {
                connection.query('SELECT broad.id, broad.email , broad.broadName, title.title FROM broad, title WHERE broad.id = title.id and broad.email = ? ',
                    'nguyenthithuan1591999@gmail.com', (error, results, fields) => {
                        let task = []
                        var same_id = {}
                        console.log(results)

                        results.forEach(element => {
                            same_id[element['id']] = 0
                        });

                        for (var id_ in same_id) {
                            let obj_same_id = results.filter(function(x) {
                                return x['id'] == id_
                            })
                            let obj = {}
                            obj['id'] = obj_same_id[0]['id']
                            obj['broadName'] = obj_same_id[0]['broadName']
                            obj['email'] = obj_same_id[0]['email']
                            obj['title'] = []
                            obj_same_id.forEach(element => {
                                let obj_title = {}
                                obj_title['title'] = element['title']
                                obj_title['id_card'] = ''
                                obj_title['text_card'] = []

                                obj['title'].push(obj_title)
                            });
                            task.push(obj)
                        }
                        task.forEach(element => {
                            if (element['id'] == 1) {
                                res.json(element)
                            }
                        });
                    });
            }
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
                if (element['id'] == 1) {
                    res.json(element)
                }
            });
        });
})

app.get('/broad', function(req, res, next) {
    connection.query('SELECT broad.id, broad.email , broad.broadName, title.title, title.id_card FROM broad, title WHERE broad.id = title.id and broad.email = ? ',
        req.cookies['email'], (error, results, fields) => {
            let task = []
            var same_id = {}
            console.log(results)

            results.forEach(element => {
                same_id[element['id']] = 0
            });

            for (var id_ in same_id) {
                let obj_same_id = results.filter(function(x) {
                    return x['id'] == id_
                })
                let obj = {}
                obj['id'] = obj_same_id[0]['id']
                obj['broadName'] = obj_same_id[0]['broadName']
                obj['email'] = obj_same_id[0]['email']
                obj['title'] = []

                obj_same_id.forEach(element => {
                    let obj_title = {}
                    obj_title['title'] = element['title']
                    obj_title['id_card'] = element['id_card']

                    obj_title['text_card'] = []

                    obj['title'].push(obj_title)
                });

                task.push(obj)
            }
            task.forEach(element => {
                if (element['id'] == req.cookies['id_broad']) {
                    let title = element['title']
                    var id_cards = []
                    title.forEach(element => {
                        id_cards.push(element['id_card'])
                    });
                    res.cookie('id_cards', id_cards)
                    res.json(element)
                }
            });
        });
})

app.get('/textCard', function(req, res, next) {

    connection.query('SELECT * FROM card ',
        req.cookies['email'], (error, results, fields) => {
            var id_cards = req.cookies['id_cards']
            let task = []
            id_cards.forEach(element => {
                let same_id_card = results.filter(function(x) {
                    return x['id_card'] == element
                })
                let obj = {}
                obj['id_card'] = element
                obj['text_card'] = []
                same_id_card.forEach(element => {
                    obj['text_card'].push(element['text_card'])
                });
                task.push(obj)
            });

            res.json(task)
        });
})
module.exports = app;