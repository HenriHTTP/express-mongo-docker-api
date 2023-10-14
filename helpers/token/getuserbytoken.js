const users = require('../../models/user.schema');

async function getuserbyToken(tokenDecode) {
  const user = await users.findOne({ _id: tokenDecode.id });
  if (!user) return;
  return user;
}

module.exports = getuserbyToken;
