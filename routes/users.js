const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//  Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handling
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;

    // Validation
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check matching passwords
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    // Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        // Re-render the register form 
        res.render('register', {
            errors,
            name, 
            email,
            password,
            password2
        });
        
    } else {
        // Validation passed
        User.findOne({email: email})
        .then(user => {
            // Re-render Form 
            if (user) {
                errors.push({msg: 'Email already exists. Try Logging in'})
                res.render('register', {
                    errors,
                    name, 
                    email,
                    password,
                    password2
                });
            } else {
                // Create an instance of the model
                const newUser = new User({name, email, password});
                
                // Hash Password
                // 1. Gernerate a salt
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        // 2. Set password to hash
                        newUser.password = hash;

                        // 3. Save the User
                        newUser.save()
                            .then(user => {
                                // See middleware setup in app.js
                                req.flash('success_msg', 'You are now registered')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                );
            }
        });
    }

    // console.log(req.body);
});
module.exports = router;