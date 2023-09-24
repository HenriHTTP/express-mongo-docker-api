const JWT = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const creteToken = async (user, req, res) => {
  const { _id, name } = user;
  const payload = { name: name, id: _id };

  //create token with object and secrect key
  const token = JWT.sign(payload, process.env.SECRET);

  res.status(200).json({
    message: 'user athentication is a sucess!',
    token: token,
    id: _id,
  });
};

module.exports = creteToken;
