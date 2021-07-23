const Validator = require("validator");
const validText = require("./valid-text");

const validateLoginInput = (data) =>  {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

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
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
};

module.exports = validateLoginInput;
