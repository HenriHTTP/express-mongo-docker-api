const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function get_token(req) {
  //token req
  const authauthorization = req.headers.authorization;
  const token = authauthorization.split(' ')[1];

  return token;
}

module.exports = get_token;
