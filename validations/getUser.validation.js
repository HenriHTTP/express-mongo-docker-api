const users = require('../models/user.schema');
const getuserbyToken = require('../helpers/getuserbytoken');
const errorToken = require('../error/errorToken');

async function getUserValidation(req, res, next) {
  try {
    // validation if email has refence in token
    const token = await getuserbyToken(req);
    const user = await users.findOne({
      _id: token._id,
    });

    const tokenIsValid = req.params.id == user._id;
    if (!tokenIsValid) {
      return res.status(400).json(errorToken.invalidSignature());
    }
    next();
  } catch (err) {
    res.status(500).json({ Message: `${err}` });
  }
}
module.exports = getUserValidation;
