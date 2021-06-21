const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExampleSchema = new Schema ({
	name : { type: String, default: 'Desconocido', required: true},
	surname : {type: String, default: 'Desconocido', required: false },
	email : { type: String, default: 'Desconocido', required: true}
});

module.exports = mongoose.model('Example', ExampleSchema);