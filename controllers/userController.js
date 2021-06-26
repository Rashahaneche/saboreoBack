const mongoose = require('mongoose');

// Importamos modelo
const User = require('../models/UserModel.js');

// Importamos bcryptjs para encriptar contraseñas
const encryptPassword = require('../utils/encrypt.js')
const { getToken } = require('../utils/getToken.js')

// Importamos bcrypt para comparar password
const bcrypt = require ('bcryptjs');

// Funcion para gestionar REGISTRAR USUARIO
const singInUser = async (req, res) => {

	const {name, surname, email, password} = req.body;
	const newUser = new User();

	newUser.name = name;
	newUser.surname = surname;
	newUser.email = email;
	// Usamos la siguiente funcion para encriptar la pass en texto plano
	newUser.password = encryptPassword(password);
	
	// Promisificamos la creación del usuario para poder guardarlo mas adelante como objeto
	const savePromisified = (thingToBeSafe) => {
		return new Promise ((resolve, reject) => {
			thingToBeSafe.save ((err, savedInfo) => {
				if (err) reject(err)
				resolve(savedInfo)
			})
		})
	};
 
	// Guardamos el save como objeto y asi podemos acceder al id del user creado por mongo
	const createdUser = await savePromisified(newUser);

	// Devolvemos token con la funcion getToken
	res.json(getToken(createdUser.id))


   /* VERSION SIN PROMISIFICAR (HACERLO PROMESA)

	newUser.save ((err, savedInfo) => { 
	if (err) console.log('Error registrando usuario', err) 
	console.log('Usuario registrado')
	const token = jwt.sign({data: createdUser.id}, process.env.SECRET_TOKEN, {expiresIn: '1h'});
	res.json(token)
	}); 
	*/
}

// Funcion para gestionar LOGIN USER
const logInUser = async (req, res) => {

	const {email, password} = req.body;

	// Buscamos usuario x email
	const userFinded = await User.findOne({email: email})
	
	// Comparamos password y devolvemos segun respuesta. ERROR, MATCH, NOT MATCH 
	bcrypt.compare(password, userFinded.password, function(err, match) {
		// ERROR
		if (err) { 
			res.json('Error:', err)
		}
		// MATCH - Coincide. Devolvemos token y perfil con info
		if (match) {
			res.json({
				token : getToken(userFinded.id),
				profile: {
					name : userFinded.name,
					surname : userFinded.surname,
					email: userFinded.email 
					}
				})
		} 
		// NOT MATCH - No coincide
		else {
			res.json('La contraseña no es correcta')
		}
	})
}

// Exportamos como objeto
module.exports = {
	singInUser,
	logInUser
}
