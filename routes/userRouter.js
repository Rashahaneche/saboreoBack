const express = require('express')

// Importamos controlador
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/', userController.singUpUser);
router.post('/login', userController.logInUser);
router.get('/verify/', userController.verifyUser);
router.post('/verify/', userController.verifyData);


module.exports = router;