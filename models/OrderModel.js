const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
	seller : { type: Schema.ObjectId, ref: "User" },
	buyer : {type: Schema.ObjectId, ref: "User" },
	dish : { type: Schema.ObjectId, ref: "Dish"},
    date : {type: Date, default: new Date()},
    price: {type: Number},
    completed:{type:Boolean, default:false}
});

module.exports = mongoose.model('Order', OrderSchema);