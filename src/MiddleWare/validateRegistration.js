function validateRegistration(req, res, next) {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();

    if (!email) {
        return res.status(400).send('Wrong email format or email is empty');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Password mismatch');
    }

    // // If everything is valid, call next() to pass control to the next middleware
    next();
}

export default validateRegistration;
