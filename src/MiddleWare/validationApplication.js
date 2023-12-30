// To validate the details filled by Applicant
function validationApplication(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    console.log(name, email, contact);
    const errors = [];

    validatePresence(name, 'Name', errors);
    validateMinLength(name, 4, 'Name', errors);

    validatePresence(email, 'Email', errors);
    validateEmailFormat(email, 'Email', errors);

    if (contact.trim().length < 10){
        errors.push("Digits in Numbers field shouldn't be less than 10");
    }
    
    if (contact.trim().length > 10){
        errors.push("Digits in Numbers field shouldn't be more than 10");
    }


    // Add more validation rules as needed

    if (errors.length > 0) {
        // If there are errors, store them in the request and proceed to the next middleware
        req.validationErrors = errors;
        return res.render('Error',{errors});
    } else {
        // If no errors, proceed to the route handling the form submission
        next();
    }
}

function validatePresence(value, fieldName, errors) {
    if (!value || value.trim().length === 0) {
        errors.push(`${fieldName} is empty`);
    }
}

function validateMinLength(value, minLength, fieldName, errors) {
    console.log('Value:', value);  // Log the value before using trim()
    if (value.trim().length < minLength) {
        errors.push(`${fieldName} length is less than ${minLength} characters`);
    }
}

function validateEmailFormat(email, fieldName, errors) {
    // Use a regular expression or any other method to check the email format
    // For simplicity, let's assume a basic format check
    if (!isValidEmail(email)) {
        errors.push(`Not a valid ${fieldName.toLowerCase()}`);
    }
}

function isValidEmail(email) {
    // Implement your email validation logic here
    // You can use regular expressions or a library like validator.js for this purpose
    // For simplicity, let's assume a basic format check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Export the upload middleware along with the validation middleware

export default validationApplication;
