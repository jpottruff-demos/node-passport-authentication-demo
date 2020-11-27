const mongoose = require('mongoose');

// Set up a schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
});

// Make the model
const User = mongoose.model('User', UserSchema);

// Export it so we can use it elsewhere
module.exports = User;