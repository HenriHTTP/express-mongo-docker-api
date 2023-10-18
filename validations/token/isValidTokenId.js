const users = require('../../models/user.schema');
const getuserbyToken = require('../../helpers/token/getuserbytoken');
const errorToken = require('../../error/errorToken');
const get_token = require('../../helpers/token/get_token');
const decodeToken = require('../../helpers/token/decodeToken');

async function isValidTokenId(req, res, next) {
  try {
    // validation if email has refence in token
    const token = await get_token(req);
    const decode = await decodeToken(token);
    const user = await getuserbyToken(decode);

    const tokenIsValid = req.params.id == user._id;
    if (!tokenIsValid) {
      return res.status(400).json(errorToken.invalidSignature());
    }
    next();
  } catch (err) {
    res.status(500).json({ Message: `${err}` });
  }
}
module.exports = isValidTokenId;
