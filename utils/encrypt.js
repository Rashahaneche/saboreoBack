const bcrypt = require('bcryptjs');

const encryptPassword = (passwordText) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(passwordText, salt);
	return hash;
}

module.exports = encryptPassword;
