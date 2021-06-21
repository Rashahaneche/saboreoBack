const express = require('express')

// Importamos controlador
const exampleController = require('../controllers/exampleController.js');

const router = express.Router();


router.get('/', exampleController.getExample);
router.post('/', exampleController.postExample);

module.exports = router;