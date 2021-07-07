const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
	name : { type: String, default: 'Desconocido', required: true},
	surname : {type: String, default: 'Desconocido', required: false},
	nickname : { type: String, default: 'Desconocido', required: true},
	email : { type: String, default: 'Desconocido', required: true},
	password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
