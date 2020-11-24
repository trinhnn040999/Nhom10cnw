var express = require('express')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
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


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url
    },
    function(req, res, profile, done) {
        process.nextTick(function() {
            console.log(profile.displayName)
                //Check whether the User exists or not using profile.id
            if (config.use_database) {
                // if sets to true
                connection.query("SELECT * from accounts_FB where id = ?", profile.id, (error, results, fields) => {
                    if (error) throw error;
                    var user = {
                        'id': profile.id,
                        'username': profile.displayName
                    }
                    console.log(profile.id)
                    console.log(profile.displayName)
                    if (results.length == 0) {

                        console.log("There is no such user, adding now");
                        connection.query("INSERT INTO accounts_FB SET ?", user, function(error, results, fields) {});
                    } else {
                        console.log("User already exists in database");
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

app.get('/', function(req, res) {
    res.render('index', { username: '' });
});

app.get('/facebook', function(req, res) {
    res.render('index', { username: req.user.displayName });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/facebook', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/login.html', function(req, res) {
    res.render('login');
})

app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render('index', { username: username })
            } else {
                res.render('login')
            }
        });
    } else {
        res.render("login")
    }
});

app.post('/register', function(req, res) {
    var user = {
        'username': req.body.username,
        'password': req.body.password,
        'email': req.body.email
    }
    connection.query('INSERT INTO accounts SET ?', user, function(error, results, fields) {
        if (error) {
            res.render('index', { username: '', tt: 'Error query' })
        } else {
            res.render('login')
        }
    })
})


app.listen(3000);