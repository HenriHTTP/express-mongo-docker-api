const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function decodeToken(token) {
  //decode token
  const tokenDecode = JWT.decode(token, process.env.SECRET);

  return tokenDecode;
}

module.exports = decodeToken;
