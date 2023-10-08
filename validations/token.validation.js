const JWT = require('jsonwebtoken');
const get_token = require('../helpers/get_token');
const errorToken = require('../error/errorToken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function tokenValidation(req, res, next) {
  try {
    //get authorization to request
    if (!req.headers.authorization) {
      res.status(400).json(errorToken.authorizationNotFound());
    }

    // get token by request
    const token = await get_token(req);
    if (!token) {
      res.status(400).json(errorToken.tokenNotFound());
    }

    // verify token
    const tokenIsValid = JWT.verify(token, process.env.SECRET);
    if (!tokenIsValid) {
      res.status(400).json(errorToken.tokenNotFound());
    }

    const decodeToken = JWT.decode(token, process.env.SECRET);

    if (!decodeToken) {
      res.status(400).json(errorToken.tokenNotFound());
    }
    next();
  } catch (err) {
    if (err instanceof JWT.JsonWebTokenError) {
      res.status(500).json(errorToken.invalidSignature());
    } else {
      res.json({ error: `${err}` });
    }
  }
}

module.exports = tokenValidation;
