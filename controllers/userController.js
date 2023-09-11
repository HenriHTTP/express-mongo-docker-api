// user controler
const users = require('../models/user.schema');

module.exports = class userController {
  static async CreateUser(req, res) {
    try {
      console.log(req.body);
      res.status(200).json(req.body);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
