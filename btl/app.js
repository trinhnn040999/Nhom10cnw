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

function check_email(email) {
    connection.query("SELECT * from accounts where email = ?", email, (error, results, fields) => {
        console.log(results)
        console.log(results.length)
        return results.length
    })
};


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

                    if (results.length == 0) {
                        // nếu chưa tồn tại
                        // thi them tai khoan moi
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


app.get('/', function(req, res) {
    res.clearCookie('username')
    res.clearCookie('email')
    res.clearCookie('sdt')
    res.clearCookie('fullname')
    res.render('index', { username: '' });
});


// thiết lập sau khi đăng nhập bằng gmail
app.get('/gmail', function(req, res) {
    connection.query("SELECT * from accounts where email = ?", req.user.emails[0]['value'], (error, results, fields) => {
        console.log(results)
        console.log(results.length)
        if (results.length > 0) {
            //tai khoan da ton tai
            res.cookie('username', results[0]['username'])
            res.cookie('email', results[0]['email'])
            res.cookie('sdt', results[0]['sdt'])
            res.cookie('fullname', results[0]['fullname'])
            res.render('home', { fullname: results[0]['fullname'] })
        } else {
            // tai khoan chua ton tai
            res.render('loginGmail', { check: '' })
        }
    })
});

app.get('/home', function(req, res) {
    res.render('home', { fullname: req.cookies.fullname })
});

// xử lý phần đăng nhập bằng facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/facebook', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

// thiết lập sau khi đăng nhập bằng facebook
app.get('/facebook', function(req, res) {
    res.render('home', { username: req.user.displayName });
});

// xử lý phần đăng nhập bằng Gmail
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));
app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: '/gmail', failureRedirect: '/login' }),
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
        return done(null, profile);
    }
));

// thiet lap chuc nang dang suat
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// thiet lap chuc nang login
app.get('/login.html', function(req, res) {
    res.render('login', { thongBao: '' });
})

// thiet lap chuc nang xem profile
app.get('/profile', function(req, res) {
    res.render('profile', { fullname: req.cookies.fullname, email: req.cookies.email, sdt: req.cookies.sdt })
});

// xử lý phần đăng nhập
app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log(username)
                    // luu username va email vao cookie
                res.cookie('username', results[0]['username']);
                res.cookie('email', results[0]['email']);
                res.cookie('sdt', results[0]['sdt']);
                res.cookie('fullname', results[0]['fullname']);
                res.render('home', { username: username });
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
            'email': req.body.email,
            'fullname': req.body.username
        }
        // them thong tin vao co so du lieu
    connection.query('INSERT INTO accounts SET ?', user, function(error, results, fields) {
        // neu co loi xay ra
        if (error) {
            // thong bao loi
            res.render('login', { thongBao: 'Error register, email already exists!', color: 'red' })
        } else {
            // thong bao thanh cong
            res.render('login', { thongBao: 'Success register, please login.', color: 'green' })
        }
    })
});

app.post('/update/gmail', function(req, res) {

    connection.query('SELECT * FROM accounts WHERE username = ?', req.body.username, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            // kiem tra username da ton tai chua
            // neu da ton tai
            res.render('loginGmail', { check: 'Username already exitsts!' })
        } else {
            // neu chua ton tai
            var user = {
                    'username': req.body.username,
                    'password': req.body.password,
                    'email': req.user.emails[0]['value'],
                    'fullname': req.body.username
                }
                // insert vao database
            connection.query('INSERT INTO accounts SET ?', user, function(error, results, fields) {
                // neu khong thanh cong
                if (error) {
                    res.render('login', { thongBao: 'Error, please try again', color: 'red' })
                } else {
                    // neu thanh cong
                    // tim kiem bang co username va luu nhung gia tri cookie
                    connection.query('SELECT * FROM accounts WHERE username = ?', req.body.username, function(error, results, fields) {
                        // neu khong thanh cong
                        if (error) throw error;

                        // neu thanh cong va co ton tai tai khoan
                        if (results.length > 0) {
                            // luu vao cookie
                            res.cookie('username', req.body.username)
                            res.cookie('email', req.body.password)
                            res.cookie('sdt', results[0]['sdt'])
                            res.cookie('fullname', req.body.username)
                            res.render('home', { username: req.body.username })

                        } else {
                            // neu tai khong ton tai bao loi
                            res.render('login', { thongBao: 'Error login, please try again', color: 'red' })
                        }
                    });
                }
            })
        }
    });

});

// xu ly phan luu profile
app.post('/saveProfile', function(req, res, next) {
    var sdt = req.body.phone
    var fullname = req.body.fullname
    var email = req.cookies.email
        // update co so du lieu
    connection.query('update accounts set fullname = ?, sdt = ? where email = ?', [fullname, sdt, email], function(error, results) {
        // neu khong thanh cong
        if (error) throw Error
            // neu thanh cong
        console.log('update success')
        res.cookie('sdt', sdt)
        res.cookie('fullname', fullname)
        res.render('profile', { fullname: fullname, email: req.cookies.email, sdt: sdt })
    })
});


app.listen(3000);