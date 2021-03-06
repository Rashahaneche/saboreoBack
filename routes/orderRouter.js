const express = require('express')

// Importamos controlador
const orderController = require('../controllers/orderController.js');

const router = express.Router();


router.get('/:id', orderController.getOrder);
router.post('/', orderController.postOrder);


module.exports = router;