var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.model');
const { check, validationResult } = require('express-validator');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // var checkAll = [check('email', 'Invalid email').isEmail(), check('password', 'Invalid password').isLength({min:5})];
    // var errors = validationResult(checkAll);
    // console.log('-------', errors);
    // if(!errors.isEmpty()) {
    //     var messages = [];
    //     errors.array().forEach(function(error) {
    //         messages.push(error.msg);
    //     });
    //     return done(null, false, req.flash('error', messages));
    // }
    // check('email', 'as').not().isEmail();
    // check('password', 'adaf').not().isLength({min:4});
    // var errors = validationResult;
    // console.log(errors.array());
    User.findOne({ 'email': email }, function(err, user) {
        if(err) {
           return done(err);
        }
        if(user) {
            return done(null, false, { message: 'Email is already in use.' });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if(err) {
           return done(err);
        }
        if(!user) {
            return done(null, false, { message: 'No user found.' });
        }
        if(!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong password.' });
        }
        return done(null, user);
    });
}));