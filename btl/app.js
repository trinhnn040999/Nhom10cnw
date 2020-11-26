var express = require('express')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('./configuration/config')
var mysql = require('mysql')
var app = express()

//Define MySQL parameter in Config.js file.
var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});


// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// sử dụng  FacebookStrategy trong Passport.
passport.use(new FacebookStrategy({
        // thiết lập các cấu hình cần thiết
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url_facebook
    },
    function(req, res, profile, done) {
        process.nextTick(function() {
            console.log(profile.displayName)

            if (config.use_database) {
                // if sets to true
                connection.query("SELECT * from accounts_FB where id = ?", profile.id, (error, results, fields) => {
                    if (error) throw error;
                    var user = {
                            'id': profile.id,
                            'username': profile.displayName
                        }
                        // console.log(profile.id)
                        // console.log(profile.displayName)
                        // kiểm tra tài khoản đã tồn tại chưa,...
                    if (results.length == 0) {
                        // nếu chưa tồn tại
                        // console.log("There is no such user, adding now");
                        connection.query("INSERT INTO accounts_FB SET ?", user, function(error, results, fields) {});
                    }
                    // Nếu  tồn tại
                    else {
                        // console.log("User already exists in database");
                    }
                });
            }
            return done(null, profile);
        });
    }
));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// 
app.get('/', function(req, res) {
    res.render('index', { username: '' });
});

// thiết lập sau khi đăng nhập bằng facebook
app.get('/facebook', function(req, res) {
    res.render('home', { username: req.user.displayName });
});

// xử lý phần đăng nhập bằng facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/facebook', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);
// xử lý phần đăng nhập bằng Gmail
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));
app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);
passport.use(new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: config.callback_url_gmail
    },
    function(accessToken, refreshToken, profile, done) {
        connection.query("SELECT * from accounts where id = ?", profile.id, (error, results, fields) => {
            console.log(profile.emails[0]['value'])
            console.log(profile.id)
            if (error) throw error;
            var user = {
                'id': profile.id,
                'username': 'h',
                'password': '123456789',
                'email': profile.emails[0]['value']
            }
            if (results.length == 0) {
                connection.query("INSERT INTO accounts SET ?", user, function(error, results, fields) {
                    if (error) throw error;
                });

            }
            // Nếu  tồn tại
            else {
                // console.log("User already exists in database");
            }
        });
        return done(null, profile);
    }
));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/login.html', function(req, res) {
    res.render('login', { thongBao: '' });
})

// xử lý phần đăng nhập
app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log(username)
                res.render('home', { username: username })
            } else {
                res.render('login', { thongBao: 'Error login, please try again', color: 'red' })
            }
        });
    } else {
        res.render("login", { thongBao: '' })
    }
});

// xử lý phần đăng kí
app.post('/register', function(req, res) {
    var user = {
        'username': req.body.username,
        'password': req.body.password,
        'email': req.body.email
    }
    connection.query('INSERT INTO accounts SET ?', user, function(error, results, fields) {
        if (error) {
            res.render('login', { thongBao: 'Error register!', color: 'red' })
        } else {
            res.render('login', { thongBao: 'Success register, please login.', color: 'green' })
        }
    })
})


app.listen(3000);