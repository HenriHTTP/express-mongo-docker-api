const users = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const createToken = require('../helpers/createToken');

class userController {
  // method register controller
  static async registerUser(req, res) {
    const { name, lastname, username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const cryptpassword = bcrypt.hashSync(password, salt);

    const user = new users({
      name,
      lastname,
      username,
      email,
      password: cryptpassword,
    });

    try {
      //save objeto in database
      await user.save();
      await createToken(user, req, res);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //method login controller
  static async loginUser(req, res) {
    try {
      const { email } = req.body;
      const user = await users.findOne({ email: email });

      //create new token
      await createToken(user, req, res);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = userController;
