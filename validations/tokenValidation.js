const JWT = require('jsonwebtoken');
const get_token = require('../helpers/get_token');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function tokenValidation(req, res, next) {
  try {
    //get authorization to request
    if (!req.headers.authorization) {
      res.status(400).json({ error: 'authorization is not found' });
    }

    // get token by request
    const token = await get_token(req);
    if (!token) {
      res.status(400).json({ error: 'token is not found' });
    }

    // verify token
    const tokenIsValid = JWT.verify(token, process.env.SECRET);
    if (!tokenIsValid) {
      res.status(400).json({ error: 'token is invalid' });
    }

    next();
  } catch (err) {
    res.json({ error: `${err}` });
  }
}

module.exports = tokenValidation;
