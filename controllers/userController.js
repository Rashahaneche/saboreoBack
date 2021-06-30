// Importamos modelo
const User = require('../models/UserModel.js');
const nodemailer = require('../utils/nodemailer.js')

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

	// Definimos la info del email de bienvenida
	let welcomeMail = {
		from: '"Saboreeeeeo" <welcome@saboreo.com>',
		to: email,
		subject: `${name}, ya eres parte de Saboreo`,
		text: "Prepárate para comer comida real :)"
	}

	// Enviamos email de bienvenida
	nodemailer.transporter.sendMail(welcomeMail, (err, info) => {
		console.log ('email enviado')
	});
	
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

