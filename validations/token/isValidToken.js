const JWT = require('jsonwebtoken');
const get_token = require('../../helpers/token/get_token');
const errorToken = require('../../error/errorToken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function isValidToken(req, res, next) {
  try {
    const authorizationRequest = req.headers.authorization;
    if (!authorizationRequest) {
      return res.status(400).json(errorToken.authorizationNotFound());
    }

    const tokenRequest = await get_token(req);
    if (!tokenRequest) {
      return res.status(400).json(errorToken.tokenNotFound());
    }

    const tokenIsValid = JWT.verify(tokenRequest, process.env.SECRET);
    if (!tokenIsValid) {
      return res.status(400).json(errorToken.tokenNotFound());
    }

    const decodeTokenIsValid = JWT.decode(tokenRequest, process.env.SECRET);
    if (!decodeTokenIsValid) {
      return res.status(400).json(errorToken.tokenNotFound());
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

module.exports = isValidToken;
