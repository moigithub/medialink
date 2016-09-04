'use strict';

var express = require('express');
var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

var User       = require('../user/user.model');


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
//    console.log("passport serialize user .id", user);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
//    console.log("passport DEserialize ID ", id);
    User.findById(id, function(err, user) {
        //console.log("passport DEserialize user found ", user);
        done(err, user);
    });
});

// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // if there is no user with that email
            // create the user
            var newUser            = new User();

            // set the user's local credentials
            newUser.accountType="local";
            newUser.local.email    = email;
            newUser.local.displayName = req.body.name;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }

    });    

    });

}));


// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));    
    
// =========================================================================
// TWITTER =================================================================
// =========================================================================
passport.use(new TwitterStrategy({

    consumerKey     : process.env.consumerKey || "8g6QEY4GmKt30xDHA5EdehRdT",
    consumerSecret  : process.env.consumerSecret||"DDp5Cy4NOS16vriZ19akSGstW9lLnynrCgAubyHSUNNHCF2Ki3",
    callbackURL     : process.env.callbackURL|| "http://mediateca-moisesman.c9users.io/auth/twitter/callback"

    },
    function(token, tokenSecret, profile, done) {
//        console.log("twitterStrategy callback");
        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {
    
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
    
                // if the user is found then log them in
                if (user) {
                    //console.log("user exist");
                    return done(null, user); // user found, return that user
                } else {
                    
                    // if there is no user, create them
                    var newUser                 = new User();
    
                    // set all of the user data that we need
                    newUser.accountType="twitter";
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = profile.token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;
    
                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        //console.log("user created");
                        return done(null, newUser);
                    });
                }
            });
    
        });
    
    })
);

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : process.env.facebookClientID || "1756825084556324",
    clientSecret    : process.env.facebookClientSecret || "a3da990b0d5a27828600cfb9febb4d83",
    callbackURL     : process.env.facebookCallbackURL || "http://mediateca-moisesman.c9users.io/auth/facebook/callback",
    profileFields   : ['id', 'email', 'name']
    
},

// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser            = new User();

                // set all of the facebook information in our user model
                newUser.accountType="facebook";
                newUser.facebook.id    = profile.id; // set the users facebook id                   
                newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                newUser.facebook.displayName  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                console.log("facebook data",profile);
                //newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });
    });

}));
/*
app.get('/auth/twitter',
  passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
var router = express.Router();

router
  .get('/twitter', passport.authenticate('twitter'))

  .get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/'
//    session: false
  }))

    .get('/facebook', passport.authenticate('facebook', { scope : 'email' }))

    // handle the callback after facebook has authenticated the user
    .get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        }))
        
    
  .post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the my watch list
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

  .post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the my watch list
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

  .get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
   // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    } else {
        // if they aren't redirect them to the home page
        //res.redirect('/');
    
        return res.status(401).send({ error: "Unauthorized, must login first." });
        
        //res.status(401);
        //return next(new Error("Unauthorized, login first."));
    }
}

module.exports.router=router;
module.exports.isLoggedIn= isLoggedIn;
