// Middleware to check if a user is logged in
const requireLogin = (req, res, next) => {
    if (req.session.user) {
        // User is logged in, continue with the request
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/login');
    }
};

export default requireLogin;