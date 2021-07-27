const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

const handleRegistration = (req, res) => {
  const { errors, isValid: inputIsValid } = validateRegisterInput(req.body);

  if(!inputIsValid) {
    return res.status(400).json(errors);
  }

  checkIfEmailExists(req.body.email).then(userWithProvidedEmail => {
    if (userWithProvidedEmail) {
      return res.status(400)
        .json({ email: "A user has already registered with that email" });
    } else {
      createUser({ 
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
};

const handleLogin = (req, res) => { 
  const { errors, isValid: inputIsValid } = validateLoginInput(req.body);

  if(!inputIsValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  checkIfEmailExists(email).then(userWithProvidedEmail => {
    if(!userWithProvidedEmail) {
      return res.status(400).json({ email: 'Login information is incorrect' });
    }

    return checkPassword(password, userWithProvidedEmail).then(isMatch => {
      if (isMatch) {
        const payload = { 
          id: userWithProvidedEmail.id, 
          email: userWithProvidedEmail.email 
        };

        return loginUser(payload, res);
      } else {
        return res.status(400)
          .json({ email: 'Login information is incorrect' })
      }});
  });
};

const getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
};

const createUser = ({ email, password }) => {
  const newUser = new User({ email, password });

  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(newUser.password, salt))
    .then(hash => {
      newUser.password = hash;
      return newUser.save();
    }).catch(err => { 
      throw err; 
    });
};

const loginUser = (payload, response) => jwt.sign(
  payload, 
  keys.secretOrKey, 
  { expiresIn: 3600 },
  (err, token)=> {
    response.json({ success: true, token: 'Bearer ' + token });
  });

const checkPassword = (inputPassword, user) => {
  return bcrypt.compare(inputPassword, user.password)
};

const checkIfEmailExists = email => User.findOne({ email })

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.get('/current', 
  passport.authenticate('jwt', { session: false }),
  getCurrentUser);

module.exports = router;



