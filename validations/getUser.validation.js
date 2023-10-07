const users = require('../models/user.schema');
const getuserbyToken = require('../helpers/getuserbytoken');
const errorToken = require('../error/errorToken');

async function getUserValidation(req, res, next) {
  try {
    // validation if email has refence in token
    const tokenUser = await getuserbyToken(req);
    const idToken = await users.findOne({
      _id: tokenUser._id,
    });
    if (req.params.id != idToken._id) {
      return res.status(400).json(errorToken.invalidSignature());
    }
    next();
  } catch (err) {
    res.status(500).json({ Message: `${err}` });
  }
}
module.exports = getUserValidation;
