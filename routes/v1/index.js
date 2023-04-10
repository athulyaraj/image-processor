const express = require('express');
const imageController = require('./controllers/images');

const router = express.Router();

router.post('/images', imageController.convertImage);

module.exports = router;
