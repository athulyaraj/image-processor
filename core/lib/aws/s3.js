const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION || 'eu-west-1',
  endpoint: process.env.AWS_LOCALSTACK_END_POINT,
  s3ForcePathStyle: true,
});

module.exports = s3;
