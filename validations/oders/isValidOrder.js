const users = require('../../models/user.schema');
const errorOders = require('../../error/errorOders');

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

    const isValidUsernameProvider = await users.findOne({
      username: usernameProvider,
    });
    if (!isValidUsernameProvider) {
      return res.status(404).json(errorOders.usernameNotFound());
    }

    next();
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}
module.exports = isValidOrder;
