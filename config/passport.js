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
        done(null, user.id);
    });

    //deserialize el usuario
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
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
          var newUserMysql = new Object();
          newUserMysql.email = email;
          newUserMysql.password = password;
          newUserMysql.name = req.param('name');
          var post = { name:  req.param('name') , email: email, password: password};
          connection.query("INSERT INTO heroku_03080da74f6c5f8.user (name, email, password, user_type) VALUES ?;", post,function(err, result) {
            if (err) {
              console.log(err);
              return done(err);
            };
            connection.destroy();/*end(function(err) {
              if (err) {
                  console.log(err);
                  return done(null, false, req.flash('signupMessage', 'Conexión a base de datos finalizada'));
              }
            });*/
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

        // Buscar el email en la base de datos
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // Si existe algun error entonces devolvemos el error
            if (err)
                return done(err);

            // Si no se encuentra un user entonces devolvemos mensaje
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No existe el usuario.'));

            // Si encontramos al user pero el password esta mal
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Password incorrecto'));

            // todo bien, devolvemos eso.
            return done(null, user);
        });

    }));

};
