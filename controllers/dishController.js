const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const { verifyToken } = require ('../utils/getToken.js')

// Importamos modelo
const Dish = require ('../models/DishModel.js');

// POST - Crear un plato
const addDish = async (req, res) => {

	// Cogemos el token de la cabecera de la llamada Post
	const userToken  = req.header('authorization').split(" ")[1];

	// Cogemos la info del body para generar el plato
	const { name, description, price, allergens, tags } = req.body;

	// validamos token y devolvemos el userId y aceptacion
	const { userId, verifiedToken } = verifyToken(userToken);

	if (verifiedToken) {

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

// GET - Devuelve info de un plato
const getDish = (req, res) => {
	res.json('getDish');
}

// Exportamos como objeto
module.exports = {
	addDish,
	getDish
}