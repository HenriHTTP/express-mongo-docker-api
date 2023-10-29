const errorMessages = require('./errorMenssages');

class errorOders extends errorMessages {
  requiredField(field) {
    return this.setStatus(400)
      .setError(`${field} is required!`)
      .setDetails(`${field} is a required field.`)
      .getMessage();
  }
  usernameNotFound() {
    return this.setStatus(404)
      .setError('usernameClient or usernameProvider not found')
      .setDetails(
        'The provided data is not found. Please provide a valid username.',
      )
      .getMessage();
  }
}

module.exports = new errorOders();
