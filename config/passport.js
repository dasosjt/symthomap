// config/passport.js

// cargar passport-local
var LocalStrategy   = require('passport-local').Strategy;

// modelo del json
var User            = require('../app/models/user');

// Cargar modulo para conexion mysql
var mysql           = require('mysql');

var dbconfig        = require('../config/databaseSQL.js');


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    //serialize el usuario
    passport.serializeUser(function(user, done) {
        console.log("HELODOSAPFKDSPFJSPAJFPSKDFPDSKFPSDF");
        done(null, user.email);
    });

    //deserialize el usuario
    passport.deserializeUser(function(email, done) {
      var connection = mysql.createConnection(dbconfig);
      connection.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
  		connection.query("select * from heroku_03080da74f6c5f8.user where email = '"+email+"'",function(err,rows){
  			done(err, rows[0]);
  		});
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================


    passport.use('local-signup', new LocalStrategy({
        // local strategy por default usa el username pero vamos a hacer override para usar un correo
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // se envia todo el request
    },
    function(req, email, password, done) {
      var connection = mysql.createConnection(dbconfig);
      connection.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
      connection.query("SELECT * FROM heroku_03080da74f6c5f8.user WHERE user.email = '"+email+"';", function(err, rows) {
        console.log(rows);
        if (err) {
          console.log(err);
          return done(err);
        };
        if(rows.length != 0){
          return done(null, false, req.flash('signupMessage', 'El correo ingresado ya existe'));
        }else{
          console.log(req.param('email'));
          var newUserMysql = new Object();
          newUserMysql.email = email;
          newUserMysql.password = password;
          newUserMysql.name = req.param('name');
          var user= {name: email, email: email, password: password, user_type: 0};
          connection.query('INSERT INTO heroku_03080da74f6c5f8.user SET ? ', user, function(err, result) {
            if (err) {
              console.log(err);
              return done(err);
            };
            connection.destroy();
            return done(null, newUserMysql);
          });
        };
      });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // Local login para la strategia para ingresar al usario

    passport.use('local-login', new LocalStrategy({
        // local strategy por default usa el username pero vamos a hacer override para usar un correo
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // vamos a pasar todo el req

    },
    function(req, email, password, done) { // callback con nuestra form
      var connection = mysql.createConnection(dbconfig);
      connection.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
      });
      connection.query("SELECT * FROM heroku_03080da74f6c5f8.user WHERE email = '" + email + "'",function(err,rows){
      if (err)
                return done(err);
       if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

      // if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);

    });
        // Buscar el email en la base de datos


    }));

};
