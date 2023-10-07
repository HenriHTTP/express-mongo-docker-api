const errorMessages = require('./errorMenssages');

class errorToken extends errorMessages {
  tokenNotFound() {
    return this.setStatus(404)
      .setError('the Token is not found')
      .setDetails(
        'The provided token is not found. Please provide a valid token.',
      );
  }
  authorizationNotFound() {
    return this.setStatus(404)
      .setError('authorization is not found')
      .setDetails(
        'The authorization header is missing. Please include a valid authorization header.',
      );
  }
  invalidSignature() {
    return this.setStatus(500)
      .setError('signature is not found')
      .setDetails(
        'The signature token is missing. Please include a valid signature token',
      );
  }
}

module.exports = new errorToken();
