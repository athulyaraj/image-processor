const logger = require('../lib/logger');

const response = {};
const { ApplicationError, InternalServerError } = require('../errors');

response.handleError = (error, res) => {
  let errorObj = error;
  logger.error('Request failed: ', error);
  if (!(error instanceof ApplicationError)) {
    errorObj = new InternalServerError(errorObj);
  }
  res.status(errorObj.httpCode)
    .json(errorObj.errors);
};

response.respond = (
  data,
  res,
  status = 200,
) => (
  res.status(status).json(data)
);

module.exports = response;
