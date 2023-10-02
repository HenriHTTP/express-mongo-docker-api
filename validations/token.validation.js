const JWT = require('jsonwebtoken');
const get_token = require('../helpers/get_token');
const errorMenssages = require('../error/errorMenssages');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function tokenValidation(req, res, next) {
  try {
    //get authorization to request
    if (!req.headers.authorization) {
      res.status(400).json(errorMenssages.authorizationNotFound());
    }

    // get token by request
    const token = await get_token(req);
    if (!token) {
      res.status(400).json(errorMenssages.tokenNotFound());
    }

    // verify token
    const tokenIsValid = JWT.verify(token, process.env.SECRET);
    if (!tokenIsValid) {
      res.status(400).json(errorMenssages.tokenNotFound());
    }

    const decodeToken = JWT.decode(token, process.env.SECRET);

    if (!decodeToken) {
      res.status(400).json(errorMenssages.tokenNotFound());
    }
    next();
  } catch (err) {
    if (err instanceof JWT.JsonWebTokenError) {
      res.status(500).json(errorMenssages.invalidSignature());
    } else {
      res.json({ error: `${err}` });
    }
  }
}

module.exports = tokenValidation;
