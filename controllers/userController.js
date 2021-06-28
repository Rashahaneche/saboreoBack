const mongoose = require('mongoose');

// Importamos modelo
const User = require('../models/UserModel.js');

// Importamos bcryptjs para encriptar contraseñas
const { encryptPassword, validatePassword } = require('../utils/encrypt.js')
const { getToken } = require('../utils/tokens.js')

// Funcion para gestionar REGISTRAR USUARIO
const singInUser = async (req, res) => {

	const {name, surname, email, password} = req.body;
	const newUser = new User();

	newUser.name = name;
	newUser.surname = surname;
	newUser.email = email;
	newUser.password = await encryptPassword(password); // Encriptamos pass

	// Creamos usuario y devolvemos la info a una variable para poder coger el id generado x mongo
	const createdUser = await newUser.save()
	
	// Devolvemos token creado con id
	res.json(getToken(createdUser.id))
}

// Funcion para gestionar LOGIN USER
const logInUser = async (req, res) => {

	const {email, password} = req.body;

	// Buscamos usuario x email
	const userFinded = await User.findOne({email: email})

	// Validamos password
	if ( await validatePassword (password, userFinded.password)) {
		// Devolvemos token
		res.json({
			token : getToken(userFinded.id),
			profile: {
				name : userFinded.name,
				surname : userFinded.surname,
				email: userFinded.email 
				}
			})

	} else {
		res.json('La contraseña no es correcta')
	}

}

// Exportamos como objeto
module.exports = {
	singInUser,
	logInUser
}

