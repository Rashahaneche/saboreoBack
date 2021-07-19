const express = require('express')

// Importamos controlador
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/', userController.singUpUser);
router.get('/verify/', userController.verifyUser);
router.post('/login', userController.logInUser);
router.get('/cocineros', userController.showUsers);
module.exports = router;