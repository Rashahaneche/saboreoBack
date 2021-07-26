// Variables de entorno
require('dotenv').config()

const mongoose = require ('mongoose');
//mongoose.set('debug', true);
const runDataBase = require('../utils/database.js');

const User = require('../models/UserModel.js');
const Dish = require('../models/DishModel.js');

const freshUsers = require('./users.js');
const freshDishes = require('./dishes.js');

const restartDB = async () => {
	await runDataBase();
	await Promise.all([
		User.deleteMany(),
		Dish.deleteMany()
	])
	
	return Promise.all([
		 User.insertMany(freshUsers),
		 Dish.insertMany(freshDishes)
	])
};

restartDB()
	.then(() => {
		console.log('Base de datos reseteada')
		process.exit()
	})
	.catch(err => `Error reseteando la DB: ${err}`)