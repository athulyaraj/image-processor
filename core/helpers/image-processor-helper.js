const promisify = require('promisify-node');

const fs = promisify('fs');
const im = promisify('imagemagick');
const uuid4 = require('uuid').v4;
const logger = require('../lib/logger');
const { s3 } = require('../lib/aws');

const imageProcessorHelper = {};

imageProcessorHelper.convertImage = async (imageUrl) => {
  const destFileName = uuid4();
  const destFilePath = `${process.cwd()}/tmp/${destFileName}`;
  try {
    // eslint-disable-next-line quotes
    await im.convert([imageUrl, '-fuzz', '5%', '-trim', '+repage', '-resize', `1200x900\>`, destFilePath]);
    await imageProcessorHelper.uploadToS3(destFileName, destFilePath, 'image/jpeg');
    return `s3://processed-images/${destFileName}`;
  } catch (error) {
    logger.error(`Error when processing: ${imageUrl}`, error);
    throw error;
  } finally {
    try {
      await fs.unlink(destFilePath);
    } catch (err) {
      logger.error(`Error when unlinking: ${destFilePath}`, err);
    }
  }
};

imageProcessorHelper.identifyImageProperties = async (url) => im.identify([url, '-verbose']);

imageProcessorHelper.uploadToS3 = async (fileName, filePath, contentType) => {
  logger.info(`Uploading file: ${fileName} filePath: ${filePath}`);
  const fileContent = await fs.readFile(filePath);
  const params = {
    Bucket: 'processed-images',
    Key: filePath,
    Body: fileContent,
    ContentType: contentType,
  };
  await s3.putObject(params).promise();
  logger.info(`Uploaded file: ${fileName} filePath: ${filePath}`);
};

imageProcessorHelper.convertProductImages = async (image) => {
  const imageUrl = await imageProcessorHelper.convertImage(image);
  return {
    image_links: imageUrl,
  };
};

module.exports = imageProcessorHelper;
