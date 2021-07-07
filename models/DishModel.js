const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DishSchema = new Schema ({
	name : { type: String, default: 'Desconocido', required: true},
	description : {type: String, default: 'Desconocido', required: false},
	price : { type: Number, default: 'Desconocido', required: true},
	allergens: { type: Array, default: [], required: true},
	vegan: {type: Boolean, default: false, required: false},
	glutenFree: {type: Boolean, default: false, required: false},
	tags : { type: Array, default: [], required: false},
	dateCreation : { type : Date, default: Date.now, required : true},
	seller : { type: Schema.ObjectId, ref: "User" }
});
DishSchema.index({name: 'text'})

module.exports = mongoose.model('Dish', DishSchema);
