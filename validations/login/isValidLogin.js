const users = require('../../models/user.schema');
const validator = require('validator');
const errorLogin = require('../../error/errorLogin');
const bcrypt = require('bcryptjs');

async function isValidLogin(req, res, next) {
  try {
    // require params
    const { email, username, password } = req.body;

    const requiredFields = ['username', 'password', 'email'];

    // validation if required values are null
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json(errorLogin.requiredField(field));
      }
    }

    const emailIsValid = validator.isEmail(email);
    if (!emailIsValid) {
      return res.status(400).json(errorLogin.invalidEmailFormat());
    }

    const emailIsAlreadyUse = await users.findOne({ email: email });
    if (!emailIsAlreadyUse) {
      return res.status(400).json(errorLogin.userNotFound());
    }

    const usernameIsAlreadyUse = await users.findOne({ username: username });
    if (!usernameIsAlreadyUse) {
      return res.status(400).json(errorLogin.userNotFound());
    }

    // validation if password is invalid
    const user = await users.findOne({ email: email });
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json(errorLogin.userNotFound());
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = isValidLogin;
