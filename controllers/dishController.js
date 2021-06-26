const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');

const { verifyToken, getDataToken } = require ('../utils/getToken.js')

// Importamos modelo
const Dish = require ('../models/DishModel.js');

// POST - Crear un plato
const addDish = async (req, res) => {

	// Cogemos el token de la cabecera de la llamada Post
	const token  = req.header('authorization').split(" ")[1];

	// Cogemos la info del body para generar el plato
	const { name, description, price, allergens, tags } = req.body;

	// Añadimos plato si el token ha sido verificado
	if (verifyToken(token)) {
		
		// Cogemos el userId de la info del token
		const { userId } = getDataToken(token);

		const newDish = new Dish({
			name,
			description,
			price,
			allergens,
			tags,
			seller : userId
		})

		newDish.save((err, savedInfo) =>{
			if (err) res.send('Error añadiendo plato:', err)
			res.json('Plato añadido!')
		})

	} else { 
		res.json('Para añadir un plato tienes que ser un usuario registrado') 
	}		
}

// GET - Devuelve info de un plato segun su Id
const getDish = async (req, res) => {

	// Hacemos la consulta y populamos al vendedor
	// Para populate pasamos primero el campo que queremos popular y luego en un solo string las propiedades que quedemos mostrar separadas por un espacio. El id se incluye por defecto
	await Dish.findOne({_id : req.params.dishId}).populate('seller', 'name surname email').exec((err, dish) => {
		if (err) res.json ('No se encuentra una plato con este Id')
		res.json(dish);
	})
	
}

// Exportamos como objeto
module.exports = {
	addDish,
	getDish
}