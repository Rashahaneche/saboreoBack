const express = require('express')

// Importamos controlador
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/', userController.singUpUser);
router.get('/verify/', userController.verifyUser);
router.post('/login', userController.logInUser);
<<<<<<< HEAD
router.get('/validate', userController.validateUser);

=======
router.get('/cocineros', userController.showUsers);
>>>>>>> 8496d514a6c7241c68e1e8a1b42e6f69c8274a11
module.exports = router;