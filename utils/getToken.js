const jwt = require ('jsonwebtoken');


// Creamos token. Pasar primer elemento como un objeto.
const getToken = (userId) => { 
	return jwt.sign({data: userId}, process.env.SECRET_TOKEN, {expiresIn: '30d'}) 
};

// Verificamos token. Ojo es la funcion de verificacion dentro de otra función
const verifyToken = (userToken) => {
	const decodedInfo =  jwt.verify(userToken, process.env.SECRET_TOKEN, function(err, decoded) {
		if (err){
			return {
				user: 'No existe',
				verifiedToken: false
			}
		}
		return {
			userId: decoded.data,
			verifiedToken: true
		}
	})
	return decodedInfo
};

module.exports = {
	getToken,
	verifyToken
}




