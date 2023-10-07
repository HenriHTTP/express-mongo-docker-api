const errorMessages = require('./errorMenssages');

class errorRegister extends errorMessages {
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

  // error if email is already in use
  emailInUse() {
    return this.setStatus(400)
      .setError('Email is already in use')
      .setDetails(
        'The provided email address is already registered. Please use a different email address.',
      )
      .getMessage();
  }

  // error if username is already in use
  usernameInUse() {
    return this.setStatus(400)
      .setError('Username is already in use')
      .setDetails(
        'The provided username is already taken. Please choose a different username.',
      )
      .getMessage();
  }
}

module.exports = new errorRegister();
