const express = require('express')

// Importamos controlador
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/singin', userController.singInUser);
router.post('/login', userController.logInUser);

module.exports = router;