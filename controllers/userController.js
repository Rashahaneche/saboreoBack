// Importamos modelo
const User = require('../models/UserModel.js');
const Dish = require('../models/DishModel.js');
const nodemailer = require('../utils/nodemailer.js');

// Importamos UUID para generar cadenas de caracteres aleatorias
const { v4: uuidv4 } = require('uuid');

// Importamos bcryptjs para encriptar contraseñas
const { encryptPassword, validatePassword } = require('../utils/encrypt.js')
const { getToken } = require('../utils/tokens.js')

// Funcion para gestionar REGISTRAR USUARIO
const singUpUser = async (req, res) => {
	const {name, surname, nickname, email, password, userType} = req.body;
	const newUser = new User();
	const codeVerification = uuidv4();

	newUser.name = name;
	newUser.surname = surname;
	newUser.nickname = nickname;
	newUser.email = email;
	newUser.verificated;
	newUser.codeVerification = codeVerification;
	newUser.userType= userType;
	newUser.password = await encryptPassword(password); // Encriptamos pass

    // Comprobamos si ya hay cuentas con ese email
	const userFinded = await User.findOne({email: email})
	if (userFinded) return res.send('El usuario ya existe'); 

	// Comprobamos si alguien ya usa el nickname
	const nicknameFinded = await User.findOne({nickname: nickname})
	if (nicknameFinded) return res.send('Alguien ya esta usando este nombre de usuario. Elige otro porfavor :)');
	
	// Creamos usuario y devolvemos la info a una variable para poder coger el id generado x mongo
	const createdUser = await newUser.save()

	// Definimos la info del email de bienvenida
	let welcomeMail = {
		from: '"Saboreeeeeo" <saboreo.app@gmail.com>',
		to: email,
		subject: `${name}, ya eres parte de Saboreo`,
		html: `<h2>Prepárate para comer comida real :)<h2>
		<h4>Pero antes necesitamos que verifiques tu cuenta clicando
		<a href=http://localhost:3000/user/verify?user=${nickname}&code=${codeVerification}>aquí</a></h4>`
	}

	// Enviamos email de bienvenida
	nodemailer.transporter.sendMail(welcomeMail, (err, info) => {
		if (err) console.log('ha habido', err);
	});
	
	// Devolvemos token creado con id
	res.json(getToken(createdUser.id))
}

// Funcion para verificar CUENTA USUARIO
const verifyUser = async (req, res) => {

	//Cogemos nickname y codigo
	const {user, code} = req.query;

	// Comparamos el código
	const userFinded = await User.findOne({codeVerification : code})

	// Gestionamos si no esncuentra nada
	if (userFinded === null) res.json('Se produjo un error')	

	// Comparamos nickname
	if (userFinded.nickname === user) { 
		
		//Modificamos campo verificated de la DB
		await User.findOneAndUpdate({codeVerification : code}, {verificated : true})
		res.json('Cuenta Verificada');
		return;
	}
	res.json('Se produjo un error')
}

// Funcion para gestionar LOGIN USER
const logInUser = async (req, res) => {

	const {email, password} = req.body;
	// Si es null devolver error

	// Buscamos usuario x email
	const userFinded = await User.findOne({email: email})
    if (!userFinded) return res.json('El usuario no existe');
	// Validamos password
	if ( await validatePassword (password, userFinded.password)) {
		// Devolvemos token
		res.json({
			token : getToken(userFinded.id),
			profile: {
				name : userFinded.name,
				surname : userFinded.surname,
				nickname : userFinded.nickname,
				email: userFinded.email 
				}
			})

	} else {
		res.json('La contraseña no es correcta')
	}

}
// Funccion para pintar Users
const showUsers = async (req, res) => {
	// Buscamos cocineros
	const userId= await Dish.distinct("seller"); 
	const cooksFound = await User.find({_id:{$in:userId}},["name","surname","nickname","description"]);

	//Si no hay cocineros
    if (!cooksFound) return res.json('No existen cocineros');
	//Devolver la siguiente info
	{res.json(cooksFound)};
	
}
// Exportamos como objeto
module.exports = {
	singUpUser,
	verifyUser,
	logInUser,
	showUsers
}

