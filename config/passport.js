const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// NOTE: passport coming in from app.js
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // 1. Match the user
            User.findOne({email: email})
                .then(user => {
                    // If there's no User we're done 
                    if (!user) {
                        // NOTE: passing in (err, user?, options)
                        return done(null, false, {message: 'That email is not registered'});
                    }

                    // 2. Match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Password is incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );
    
    // Serialize / Deserialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });

}
