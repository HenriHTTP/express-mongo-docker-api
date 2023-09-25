const users = require('../models/user.schema');
const validator = require('validator');
const errorMenssages = require('../error/errorMenssages');
const bcrypt = require('bcryptjs');

const LoginValidations = async (req, res, next) => {
  try {
    //require params
    const { name, lastname, email, username, password, confirmpassword } =
      req.body;

    const requirefields = ['username', 'password', 'email'];

    // validationn  if required values  is  null
    for (const fields of requirefields) {
      if (!req.body[fields]) {
        return res.status(400).json(errorMenssages.requiredField(fields));
      }
    }

    // validationn  if email is already in use
    const emailExist = await users.findOne({ email: email });
    if (!emailExist) {
      return res.status(400).json(errorMenssages.userNotFound());
    }

    // validationn  if username is already in use
    const usernameExist = await users.findOne({ username: username });
    if (!usernameExist) {
      return res.status(400).json(errorMenssages.userNotFound());
    }

    const user = await users.findOne({ email: email });
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json(errorMenssages.userNotFound());
    }
    next();
  } catch (err) {
    return err;
  }
};

module.exports = LoginValidations;
