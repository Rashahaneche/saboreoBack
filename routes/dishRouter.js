const express = require ('express');

// Importamos controlador Dish
const dishController = require ('../controllers/dishController.js')

const router = express.Router();

router.post('/', dishController.addDish);
router.get('/:dishId', dishController.getDish);

module.exports = router;