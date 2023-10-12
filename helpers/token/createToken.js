const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createToken(user, req, res) {
  const { _id, username } = user;
  const payload = { username: username, id: _id };

  //create token with object and secrect key
  const token = JWT.sign(payload, process.env.SECRET);

  res.status(200).json({
    message: 'user athentication is a sucess!',
    token: token,
    id: _id,
  });
}
module.exports = createToken;
