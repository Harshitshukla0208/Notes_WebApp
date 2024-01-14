const express = require('express');
const router = express.Router();
const serverController = require('../controller/server-controller');

router.get('/', serverController.homepage);
router.get('/about', serverController.about);

module.exports = router;