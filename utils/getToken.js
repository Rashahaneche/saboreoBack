const jwt = require ('jsonwebtoken');

// Creamos token
// Para usar expiresIn es obligatorio pasar el primer elemento como un objeto.
const getToken = (userId) => { 
	return jwt.sign({data: userId}, process.env.SECRET_TOKEN, {expiresIn: '1h'}) 
};

module.exports = getToken;

