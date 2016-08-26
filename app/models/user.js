// app/models/user.js
// require
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// JSON para mongoDB
var userSchema = mongoose.Schema({

    local            : {
        iduser       : String,
        name         : String,
        email        : String,
        password     : String,
        user_type    : String,
    },

});

// metodos ======================
// generar hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// verificar password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// crear modelo de DB y pasar al app
module.exports = mongoose.model('User', userSchema);
