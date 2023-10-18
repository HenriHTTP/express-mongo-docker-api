const users = require('../../models/user.schema');
const validator = require('validator');
const errorRegister = require('../../error/errorRegister');

async function isValidRegister(req, res, next) {
  try {
    //require params
    const { email, username, password, confirmpassword } = req.body;

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

    const passwordMatch = password == confirmpassword;
    if (!passwordMatch) {
      return res.status(400).json(errorRegister.passwordMismatch());
    }

    const emailIsValid = validator.isEmail(email);
    if (!emailIsValid) {
      return res.status(400).json(errorRegister.invalidEmailFormat());
    }

    const emailIsAlreadyUse = await users.findOne({ email: email });
    if (emailIsAlreadyUse) {
      return res.status(400).json(errorRegister.emailInUse());
    }

    const usernameIsAlreadyUse = await users.findOne({ username: username });
    if (usernameIsAlreadyUse) {
      return res.status(400).json(errorRegister.usernameInUse());
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

module.exports = isValidRegister;
