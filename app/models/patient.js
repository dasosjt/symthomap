// app/models/patient.js
// require
var mongoose = require('mongoose');

// JSON para mongoDB
var patientSchema = mongoose.Schema({

    patient            : {
        name         : String,
        email        : String,
        dir          : String,
        symptoms     : String,
    },

});


// crear modelo de DB y pasar al app
module.exports = mongoose.model('User', userSchema);
