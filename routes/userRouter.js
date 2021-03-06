const express = require('express')

// Importamos controlador
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/', userController.singUpUser);
router.post('/login', userController.logInUser);
router.get('/verify/', userController.verifyUser);
router.post('/verify/', userController.verifyData);
router.get('/validate', userController.validateUser);
router.get('/cocineros', userController.showUsers);
module.exports = router;