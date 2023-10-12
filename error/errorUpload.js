// uploads error
const errorMessages = require('./errorMenssages');

class errorUpload extends errorMessages {
  invalidImage() {
    return this.setStatus('error')
      .setError('Image invalid')
      .setDetails(
        'The provided email address is not in a valid format.to send other image',
      )
      .getMessage();
  }
  arquiveNotFound() {
    return this.setStatus(404)
      .setError('arquive not found or not to sent')
      .setDetails(
        'The provided arquive is not found. Please provide a valid arquive.',
      )
      .getMessage();
  }
}

module.exports = new errorUpload();
