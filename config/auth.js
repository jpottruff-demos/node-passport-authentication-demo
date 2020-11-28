// Auth Guard
// (Can add this to any route we want to be protected - eg. Dashboard)

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        //  Passport is giving us this
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Please login to view this page');
        res.redirect('/users/login');

    }
}