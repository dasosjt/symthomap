// app/routes.js

var Patient            = require('./models/patient');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE  ==========================
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // cargar index.ejs
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

    // procesar ingresar nuevo usuario
    app.post('/dashboard',function(req, res){

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

    });
};

// verificar si esta logeado
function isLoggedIn(req, res, next) {

    // si esta autentificado, que prosiga
    if (req.isAuthenticated())
        return next();

    // si no esta, entonces redirigir al home
    res.redirect('/');
}
