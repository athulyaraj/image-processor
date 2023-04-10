const logger = require('../../../core/lib/logger');
const responseHandler = require('../../../core/helpers/respose-handler');
const imageService = require('../services/images');

const imagesController = {};

imagesController.convertImage = async (req, res) => {
  try {
    const response = await imageService.convertImages(req.body);
    responseHandler.respond(response, res);
  } catch (error) {
    logger.error('Error when image processing', error);
    responseHandler.handleError(error, res);
  }
};

module.exports = imagesController;
