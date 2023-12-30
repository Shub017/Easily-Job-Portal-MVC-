import { body, validationResult } from 'express-validator';

const createJobValidationMiddleware = [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('jobLocation').notEmpty().withMessage('Location is required'),
  body('salary').notEmpty().withMessage('Salary is required'),
  body('skillsRequired').notEmpty().withMessage('Skills are required'),
  body('deadLineToApply').notEmpty().withMessage('Deadline to Apply is required'),
  body('jobCategory').notEmpty().withMessage('Job Category is required'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('createJobErrors', { errors: errors.array() });
    }
    next();
  },
];

export default createJobValidationMiddleware;
