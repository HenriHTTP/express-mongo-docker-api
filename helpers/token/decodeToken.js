const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function decodeToken(req) {
  //token req
  const authauthorization = req.headers.authorization;
  const token = authauthorization.split(' ')[1];

  //decode token
  const tokenDecode = JWT.decode(token, process.env.SECRET);

  return tokenDecode;
}

module.exports = decodeToken;
