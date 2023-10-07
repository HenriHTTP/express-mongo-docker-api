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
}

module.exports = errorMessages;
