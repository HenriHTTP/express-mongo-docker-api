const users = require('../../models/user.schema');
const validator = require('validator');
const errorUpdate = require('../../error/errorUpdate');

async function isValidUpdate(req, res, next) {
  try {
    //require params
    const { email, password, confirmpassword } = req.body;

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
        return res.status(400).json(errorUpdate.requiredField(fields));
      }
    }

    const passwordMatch = password == confirmpassword;
    if (!passwordMatch) {
      return res.status(400).json(errorUpdate.passwordMismatch());
    }

    const emailIsValid = validator.isEmail(email);
    if (!emailIsValid) {
      return res.status(400).json(errorUpdate.invalidEmailFormat());
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

module.exports = isValidUpdate;
