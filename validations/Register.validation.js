const users = require('../models/user.schema');
const validator = require('validator');
const errorRegister = require('../error/errorRegister');

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
        return res.status(400).json(errorRegister.requiredField(fields));
      }
    }

    // validationn password and  confirmpassoword  is equal
    if (password != confirmpassword) {
      return res.status(400).json(errorRegister.passwordMismatch());
    }

    // validationn email is correct pattern
    if (!validator.isEmail(email)) {
      return res.status(400).json(errorRegister.invalidEmailFormat());
    }

    // validationn  if email is already in use
    const emailExist = await users.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json(errorRegister.emailInUse());
    }

    // validationn  if username is already in use
    const usernameExist = await users.findOne({ username: username });
    if (usernameExist) {
      return res.status(400).json(errorRegister.usernameInUse());
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

module.exports = registerValidation;
