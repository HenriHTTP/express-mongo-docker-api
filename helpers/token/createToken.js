const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createToken(user) {
  const { _id, username } = user;
  const payload = { username: username, id: _id };
  //create token with object and secrect key
  const token = JWT.sign(payload, process.env.SECRET);
  return token;
}
module.exports = createToken;
