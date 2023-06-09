class ApplicationError extends Error {
  constructor(errors, httpCode, message) {
    super((message || 'Error'));
    this.httpCode = httpCode || 500;
    this.errors = errors;
  }
}

module.exports = ApplicationError;
