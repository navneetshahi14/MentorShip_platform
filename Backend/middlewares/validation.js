const { check, validationResult } = require('express-validator');


const validateInputs = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};


const validateRegistration = [
  check('email', 'Invalid email address').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('role', 'Role must be either mentor or mentee').isIn(['mentor', 'mentee']),
];


const validateLogin = [
  check('email', 'Invalid email address').isEmail(),
  check('password', 'Password is required').notEmpty(),
];


module.exports = {
  validateInputs,
  validateRegistration,
  validateLogin,
};
