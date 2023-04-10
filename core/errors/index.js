const errors = {};

errors.ApplicationError = require('./application-error');
errors.InternalServerError = require('./internal-server-error');

module.exports = errors;
