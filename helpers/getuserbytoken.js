const users = require('../models/user.schema');
const decodeToken = require('./decodeToken');

async function getuserbyToken(req) {
  const token = await decodeToken(req);
  const user = await users.findOne({ _id: token.id });
  if (!user) return;
  return user;
}

module.exports = getuserbyToken;
