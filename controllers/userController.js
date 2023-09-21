// user controler
const users = require('../models/user.schema');
const bcrypt = require('bcryptjs');

module.exports = class userController {
  static async registerUser(req, res) {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const cryptpassword = bcrypt.hashSync(password, salt);

    const user = new users({
      username,
      email,
      password: cryptpassword,
    });

    try {
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
