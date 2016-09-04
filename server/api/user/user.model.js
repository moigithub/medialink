'use strict';
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    accountType: String,
    local            : {
        email        : String,
        password     : String,
        displayName  : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        displayName  : String
    },    
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    }
});


// methods ======================
// generating a hash
UsersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UsersSchema);