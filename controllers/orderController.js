// Importamos modelo
const Order = require('../models/OrderModel.js');
const Dish = require ('../models/DishModel.js');

// Funcion para gestionar get
const getOrder = async (req, res) => {
	const Orders = await Order.find();
	res.send (Orders);
}
// Funcion para mostrar los pedidos de cada usuario
const getOrderByUser = async (req, res) => {
	const UserOrders = await Order.find({buyer:req.params.id},["dish"]);
    const dishIds= UserOrders.map(orderData => orderData.dish);
    const Orders= await Dish.find({_id:{$in:dishIds}},["name","description","seller"]);
	res.send (Orders);
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
	postOrder,
    getOrderByUser
}