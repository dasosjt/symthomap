// config/passport.js

// cargar passport-local
var LocalStrategy   = require('passport-local').Strategy;

// modelo del json
var User            = require('../app/models/user');

// Cargar modulo para conexion mysql
var mysql           = require('mysql');

var dbconfig        = require('../config/databaseSQL.js');

var pool      = mysql.createPool(dbconfig);

// encriptador
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    //serialize el usuario
    passport.serializeUser(function(user, done) {
        console.log("serializeUser ", user.email);
        done(null, user.email);
    });

    //deserialize el usuario
    passport.deserializeUser(function(email, done) {
        console.log("deserializeUser ", email);
        pool.getConnection(function(err, connection) {
          connection.query("select * from heroku_03080da74f6c5f8.user where email = '"+email+"'",function(err,rows){
            connection.release();
              done(err, rows[0]);
          });
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
      pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM heroku_03080da74f6c5f8.user WHERE user.email = '"+email+"';", function(err, rows) {
          console.log(rows);
          if (err) {
            console.log(err);
            return done(err);
          };
          if(rows.length != 0){
            return done(null, false, req.flash('signupMessage', 'El correo ingresado ya existe'));
          } else {
            console.log(req.param('email'));
            var newUserMysql = new Object();
            newUserMysql.email = email;
            var hash = bcrypt.hashSync(password);
            console.log("Hashed password ", hash);
            newUserMysql.password = hash;
            newUserMysql.user_type = req.param('user_type');
            var user = {name: newUserMysql.email, email: email, password: hash, user_type: newUserMysql.user_type};
            connection.query('INSERT INTO heroku_03080da74f6c5f8.user SET ? ', user, function(err, result) {
              connection.release();
              if (err) {
                console.log(err);
                return done(err);
              };
              return done(null, newUserMysql);
            });
          };
        });
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
      pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM heroku_03080da74f6c5f8.user WHERE email = '" + email + "'",function(err,rows){
          connection.release();
          if (err) {
            return done(err);
          };
          console.log(rows);
          console.log("above row object");
          if (!rows.length) {
            console.log("No user found ");
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          };
          // Si el usuario se encuentra pero el password es incorrecto

          if(bcrypt.compareSync(password, rows[0].password)){
            console.log("SAME PASSWORD");
          }else{
            console.log("Wrong password ");
            return done(null, false, req.flash('loginMessage', 'Oops! I did again to your heart'));
          };
          // todo bien, devolvemos user
          return done(null, rows[0]);
      });
    });
  }));
};
