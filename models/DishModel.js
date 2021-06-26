const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DishSchema = new Schema ({
	name : { type: String, default: 'Desconocido', required: true},
	description : {type: String, default: 'Desconocido', required: false},
	price : { type: Number, default: 'Desconocido', required: true},
	allergens: { type: Array, default: [], required: true},
	tags : { type: Array, default: [], required: false},
	seller : { type: Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Dish', DishSchema);
