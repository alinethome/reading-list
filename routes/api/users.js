const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');

const router = express.Router();

const handleRegistration = (req, res) => {
  const { errors, isValid: inputIsValid } = validateRegisterInput(req.body);

  if(!inputIsValid) {
    return res.status(400).json(errors);
  }

  checkEmailUniqueness(req.body.email).then(userWithProvidedEmail => {
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

const checkEmailUniqueness = email => User.findOne({ email })

router.post('/register', handleRegistration);

module.exports = router;



