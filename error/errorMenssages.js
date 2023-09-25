class errorMessages {
  constructor() {
    this.status = null;
    this.error = null;
    this.details = null;
  }

  setError(error) {
    this.error = error;
    return this;
  }
  setDetails(details) {
    this.details = details;
    return this;
  }
  setStatus(status) {
    this.status = status;
    return this;
  }
  getMessage() {
    return {
      status: this.status || 500,
      error: this.error || 'Internal Server Error',
      details:
        this.details || 'An error occurred while processing the request.',
    };
  }

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

  // error if user is not found
  userNotFound() {
    return this.setStatus(404)
      .setError('Username or password not found')
      .setDetails(
        'The provided data is not found. Please provide a valid username and password.',
      )
      .getMessage();
  }
}

module.exports = new errorMessages();
