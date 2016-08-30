// app/routes.js

var Patient       = require('./models/patient');
var mysql      = require('mysql');
var express  = require('express');
var app      = express();
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE  ==========================
    // ===============================  ======
    app.get('/', function(req, res) {
        console.log("GET /");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });
    app.get('/login', function(req, res) {
        console.log("GET NERDS");
        res.sendfile('./public/views/index.html'); // cargar index html para Angular
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res) {
        // cargar login.ejs y pasar mensajes por flash hacia loginMessage
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

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
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.ejs', {
            user : req.user // obtener el user de la sesion y pasarla al template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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
   //Llamando BD prueba
   app.get('/get', function(req, res) {
     var con = mysql.createConnection({
        host: "us-cdbr-iron-east-04.cleardb.net",
        database: "heroku_03080da74f6c5f8",
        user: "b3e57dbbcff155",
        password: "34489aa6"
      });

      con.connect(function(err){
        if(err){
          console.log('Error connecting to Db');
          return;
        }
        console.log('Connection established');
        });

        /*con.end(function(err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
      });*/
      con.end();
      console.log('Connection terminated');

   });
    // procesar ingresar nuevo usuario
    app.post('/dashboard',createPatient);
};

// verificar si esta logeado
function isLoggedIn(req, res, next) {

    // si esta autentificado, que prosiga
    if (req.isAuthenticated())
        return next();

    // si no esta, entonces redirigir al home
    res.redirect('/');
}

function createPatient(req, res, next) {

  // creamos al paciente
  var newPatient = new Patient();

  // ingresamos los valores del paciente
  newPatient.patient.name = req.param('name');
  newPatient.patient.email = req.param('email');
  newPatient.patient.dir = req.param('dir');
  newPatient.patient.symptoms = req.param('symptoms');

  // guardamos el usuario
  newPatient.save(function(err) {
    if (err)
      res.send(err);

    res.redirect('/dashboard');
  });
}
