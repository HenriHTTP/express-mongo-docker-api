const errorMessages = require('./errorMenssages');

class errorUpdate extends errorMessages {
  // error if fields not found

  requiredField(field) {
    return this.setStatus(400)
      .setError(`${field} is required!`)
      .setDetails(`${field} is a required field.`)
      .getMessage();
  }

  // error if password confirm is invalid
  passwordMismatch() {
    return this.setStatus('error')
      .setError('Passwords do not match')
      .setDetails(
        'The provided passwords do not match. Please make sure the passwords match exactly.',
      )
      .getMessage();
  }

  // error if email has invalid pattern
  invalidEmailFormat() {
    return this.setStatus(400)
      .setError('Invalid email format')
      .setDetails('The provided email address is not in a valid format.')
      .getMessage();
  }
}

module.exports = new errorUpdate();
