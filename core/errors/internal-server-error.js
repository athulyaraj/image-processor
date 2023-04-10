const ApplicationError = require('./application-error');

class InternalServerError extends ApplicationError {
  constructor(error) {
    const errorJson = [
      {
        title: 'Internal Server Error',
      }];

    if (error && (typeof error === 'object') && ('message' in error) && process.env.NODE_ENV !== 'production') {
      errorJson[0].detail = error.message;
    }
    super(errorJson, 500, 'Internal Server Error');
  }
}

module.exports = InternalServerError;
