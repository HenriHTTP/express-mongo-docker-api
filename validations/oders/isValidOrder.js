const users = require('../../models/user.schema');
const errorOders = require('../../error/errorOders');
const Get_token = require('../../helpers/token/get_token');
const decodeToken = require('../../helpers/token/decodeToken');

async function isValidOrder(req, res, next) {
  try {
    const { usernameClient, usernameProvider, type } = req.body;

    const requiredFields = ['usernameClient', 'usernameProvider', 'type'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json(errorOders.requiredField(field));
      }
    }

    const isValidUsernameClient = await users.findOne({
      username: usernameClient,
    });
    if (!isValidUsernameClient) {
      return res.status(404).json(errorOders.usernameNotFound());
    }

    const token = await Get_token(req);
    const tokenDecode = await decodeToken(token);
    const user = await users.findOne({ _id: tokenDecode.id }, { password: 0 });
    const isValidTokenUser = usernameClient == user.username;
    if (!isValidTokenUser) {
      return res.status(400).json({ MessageEvent: 'token invalido' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}
module.exports = isValidOrder;
