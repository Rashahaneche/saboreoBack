const mongoose = require('mongoose');

// Importamos modelo
const Example = require('../models/ExampleModel.js');

// Funcion para gestionar get
const getExample = async (req, res) => {
	const examples = await Example.find();
	res.send (examples);
}

// Funcion para gestionar post
const postExample = (req, res) => {

	const {name, surname, email} = req.body;
	const newExample = new Example();

	newExample.name = name;
	newExample.surname = surname;
	newExample.email = email;

	newExample.save ((err, savedInfo) => {
		if (err){
			console.log('Error añadiendo ejemplo', err);
		}
		res.send('Nuevo ejemplo añadido');
	});
}

// Exportamos como objeto
module.exports = {
	getExample,
	postExample
}