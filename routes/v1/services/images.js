const logger = require('../../../core/lib/logger');
const imageProcessorHelper = require('../../../core/helpers/image-processor-helper');

const imagesService = {};

imagesService.convertImages = async (body) => {
  try {
    const response = await imageProcessorHelper.convertProductImages(body.imageUrl);
    logger.info(`Image url processed: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    logger.error('Error when processing', error);
    throw error;
  }
};

module.exports = imagesService;
