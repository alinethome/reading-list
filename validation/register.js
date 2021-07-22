const Validator = require("validator");
const validText = require("./valid-text");

const validateRegisterInput = (data) =>  {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.passwordConfirm = validText(data.passwordConfirm) ? 
    data.passwordConfirm : '';

  validateEmail(data.email, errors);
  validatePassword(data.password, data.passwordConfirm, errors);

  return {
    errors, 
    isValid: Object.keys(errors).length === 0
  };
};

const validateEmail = (email, errors) => {
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
};

const validatePassword = (password, passwordConfirm, errors) => {
  if (!Validator.equals(password, passwordConfirm)) {
    errors.password = 'Password confirmation must match password';
  }

  if (Validator.isEmpty(passwordConfirm)) {
    errors.password = 'Password confirmation is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
};

module.exports = validateRegisterInput;
