const JWT = require('jsonwebtoken');
const get_token = require('../helpers/get_token');
const errorToken = require('../error/errorToken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function tokenValidation(req, res, next) {
  try {
    const authorizationRequest = req.headers.authorization;
    if (!authorizationRequest) {
      res.status(400).json(errorToken.authorizationNotFound());
    }

    const tokenRequest = await get_token(req);
    if (!tokenRequest) {
      res.status(400).json(errorToken.tokenNotFound());
    }

    const tokenIsValid = JWT.verify(token, process.env.SECRET);
    if (!tokenIsValid) {
      res.status(400).json(errorToken.tokenNotFound());
    }

    const decodeTokenIsValid = JWT.decode(token, process.env.SECRET);
    if (!decodeTokenIsValid) {
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
