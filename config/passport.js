// config/passport.js

// cargar passport-local
var LocalStrategy   = require('passport-local').Strategy;

// modelo del json
var User            = require('../app/models/user');

// Cargar modulo para conexion mysql
var mysql           = require('mysql');

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

        process.nextTick(function() {
        var con = mysql.createConnection({
           host: "us-cdbr-iron-east-04.cleardb.net",
           database: "heroku_03080da74f6c5f8",
           user: "b3e57dbbcff155",
           password: "34489aa6"
        });
        // checkear si el password y password* es el mismo
        if(password ===  req.param('password_0')){

          // checkear que el user ya exitste
          con.connect(function(err){
            if(err){
              console.log('Error connecting to Db');
              return;
            }
            console.log('Connection established');
            console.log('Connected as id ' + con.threadId);
            });

            var existencia = false;

            con.query("SELECT * FROM heroku_03080da74f6c5f8.user WHERE user.email = '"+email+"';", function(err, rows, fields) {
              console.log(rows);
            if(rows[0].email != undefined){
              console.log('Usuario si existe');

            }else{
              var post = { name : rows[0].name, email: rows[0].email, password: rows[0].password};
              connection.query("INSERT INTO heroku_03080da74f6c5f8.user (name, email, password, user_type) VALUES (?,?, ?, 0);", post,function(err, result) {
                    // NeatoMOFO!
                });
              console.log(query.sql);
            }

          });


          con.end(function(err) {
            console.log(err);
          });

          /*User.findOne({ 'local.email' :  email }, function(err, user) {
              // si hay errores, devolver el error
              if (err)
                  return done(err);

              // si existe, entonces devolver un mensaje por flash al signupMessage
              if (user) {
                  return done(null, false, req.flash('signupMessage', 'El correo ingresado ya existe'));
              } else {

                  // Si no hay, entonces creamos el usuario
                  var newUser            = new User();

                  // ingresamos los valores del usuario
                  newUser.local.email    = email;
                  newUser.local.password = newUser.generateHash(password);
                  newUser.local.user_type = req.param('user_type');

                  // guardamos el usuario
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }
            });*/
          } else {
            return done(null, false, req.flash('signupMessage', 'Verificar password ingresado'));
          }
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
