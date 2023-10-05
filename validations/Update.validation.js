const users = require('../models/user.schema');
const validator = require('validator');
const errorMessages = require('../error/errorMenssages');

async function registerValidation(req, res, next) {
  try {
    //require params
    const { name, lastname, email, username, password, confirmpassword } =
      req.body;

    // dependece array
    const requirefields = [
      'name',
      'lastname',
      'email',
      'username',
      'password',
      'confirmpassword',
    ];

    // validationn  if required values  is  null
    for (const fields of requirefields) {
      if (!req.body[fields]) {
        return res.status(400).json(errorMessages.requiredField(fields));
      }
    }

    // validationn password and  confirmpassoword  is equal
    if (password != confirmpassword) {
      return res.status(400).json(errorMessages.passwordMismatch());
    }

    // validationn email is correct pattern
    if (!validator.isEmail(email)) {
      return res.status(400).json(errorMessages.invalidEmailFormat());
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

module.exports = registerValidation;
