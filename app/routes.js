// app/routes.js

var Patient       = require('./models/patient');
var mysql      = require('mysql');
var express  = require('express');
var app      = express();
var mysql           = require('mysql');
var dbconfig        = require('../config/databaseSQL.js');

var pool = mysql.createPool(dbconfig);

module.exports = function(app, passport) {

    // =====================================
    // ANGULAR ROUTES  =====================
    // =====================================
    app.get('/', function(req, res) {
        console.log("GET /");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });
    app.get('/login', function(req, res) {
        console.log("GET LOGIN");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });
    app.get('/signup', function(req, res) {
        console.log("GET SIGNUP");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });

    app.get('/dashboard', isLoggedIn,  function(req, res) {
        console.log("GET DASHBOARD");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    /*app.get('/login', function(req, res) {
        // cargar login.ejs y pasar mensajes por flash hacia loginMessage
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });*/

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup', function(req, res) {

        // cargar signup.ejs y pasar mensajes por flash hacia signupMessage
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // =====================================
    // dashboard SECTION =====================
    // =====================================
    // Pagina protegida.. por lo tanto deben estar logeados para visitarla
    // isLoggedIn function
    /*app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.ejs', {
            user : req.user // obtener el user de la sesion y pasarla al template
        });
    });*/

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // patient =============================
    // =====================================
    // Get all the patients
    app.get('/patient', isLoggedIn,  function(req, res){
      pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM heroku_03080da74f6c5f8.patient ", function(err, rows) {
          connection.release();
          if(rows){
            if(!rows.length){
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({ patients : rows }));
            }
            if (err) {
              console.log(err);
              return done(err);
            };
          } else {
            console.log("rows of get Patient are undefined");
          }
        });
      });
    });

    // procesar el signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirigir al dashboard
        failureRedirect : '/signup', // redirige a signup por el error
        failureFlash : true // permitir flash messages
    }));

    // procesar login form
    app.post('/login', passport.authenticate('local-login', {
     successRedirect : '/dashboard', // redirigir al dashboard
     failureRedirect : '/login', // redirige a login por el error
     failureFlash : true // permitir flash messages
   }));
};

// verificar si esta logeado
function isLoggedIn(req, res, next) {

    // si esta autentificado, que prosiga
    if (req.isAuthenticated())
        return next();

    // si no esta, entonces redirigir al home
    res.redirect('/');
}
