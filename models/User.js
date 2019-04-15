'use strict';
let mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
//    validator = require('validator'),
//    Habit = require('./Habit')
/**
 * Example User Schema with a firstname, lastname, email, and password field
 */
var UserSchema = mongoose.Schema({
    username: {
        type: String,
    },
    firstname: {
        type: String,

    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
        unique: true
    },
    password: {
        type: String,
        required: true
        },
    created:{
        type:Date,
        default: Date.now
        },
    userhabits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

/**
 * Number of rounds to hash the password (aka Work Factor)
 * @link https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
 */
const SALT_ROUNDS = 10;

/**
 * Save hook, converts the password from a string into a bcrypt salted hash
 */
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

/**
 * Method to validate the plaintext password with the hashed/salted password
 * @param  {[String]}   candidatePassword
 * @param  {Function} cb(err, isMatch) err - If error comparing, isMatch boolean incidating a matched password
 * @return {Promise}
 */
UserSchema.methods.validatePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return reject(err);
        resolve(isMatch);
    });
  });
};

// Method for simplifying login by username or email

UserSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });
    if (!user) {
      user = await this.findOne({ email: login });
    }
    return user;
};

UserSchema.pre('remove', function(next) {
  this.model('Message').deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model('User', UserSchema);
