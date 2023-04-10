require('dotenv').config({ path: `${process.cwd()}/.env` });
const s3 = require('./s3');

const aws = {};
aws.s3 = s3;

module.exports = aws;
