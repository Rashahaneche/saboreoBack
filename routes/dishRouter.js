const express = require ('express');

// Importamos controlador Dish
const dishController = require ('../controllers/dishController.js')

const router = express.Router();

router.post('/', dishController.addDish);
router.get('/', dishController.getListOfDishes);
router.get('/:id',dishController.getDishByID);
router.get('/user/:id',dishController.getDishesBySeller);
router.get ('/ordered', dishController.getLatestDishesOrderedByUser)

module.exports = router;