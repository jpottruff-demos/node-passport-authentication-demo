const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initalize app
const app = express();

// Passport config
require('./config/passport')(passport);

// DB config / Connection
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser (allows us to get info from our form with req.body)
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session ({
    secret: 'this does not matter',
    resave: true,
    saveUninitialized: true,
}));

// Passport Middleware (NOTE: put AFTER the session)
// Initalizes the local strategy we brough in above
app.use(passport.initialize());
app.use(passport.session()); 


// Connect Flash (gives access to request.flash)
app.use(flash());

// Global Variables (For Message Flashes)
app.use((req, res, next) => {
    // These are for Connect Flash
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    // This one is from Passport
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



// Ports 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));