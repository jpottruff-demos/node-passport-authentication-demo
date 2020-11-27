const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Initalize app
const app = express();

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

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



// Ports 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));