const errorMessages = require('./errorMenssages');

class errorLogin extends errorMessages {
  // error if fields not found
  requiredField(field) {
    return this.setStatus(400)
      .setError(`${field} is required!`)
      .setDetails(`${field} is a required field.`)
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

  // error if email has invalid pattern
  invalidEmailFormat() {
    return this.setStatus(400)
      .setError('Invalid email format')
      .setDetails('The provided email address is not in a valid format.')
      .getMessage();
  }
}

module.exports = new errorLogin();
