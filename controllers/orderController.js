// Importamos modelo
const Order = require('../models/OrderModel.js');

// Funcion para gestionar get
const getOrder = async (req, res) => {
	const order = await Order.find({_id:req.params.id});
	res.send (order);
}


// Funcion para gestionar post
const postOrder = (req, res) => {

	const {seller,buyer,dish,date,completed} = req.body;
	const newOrder= new Order();

	newOrder.seller = seller;
	newOrder.buyer = buyer;
	newOrder.dish = dish;
    newOrder.date= date;
    newOrder.completed=completed;

	newOrder.save ((err, savedInfo) => {
		if (err){
			console.log('Error añadiendo ejemplo', err);
		}
		res.json(savedInfo);
	});
}

// Exportamos como objeto
module.exports = {
	getOrder,
	postOrder
}