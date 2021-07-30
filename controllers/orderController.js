// Importamos modelo
const Order = require('../models/OrderModel.js');

// Funcion para gestionar get
const getOrder = async (req, res) => {
	const order = await Order.find({_id:req.params.id});
	res.send (order);
}


// Funcion para gestionar post
const postOrder = (req, res) => {
    // Cogemos el token de la cabecera de la llamada Post
	const token  = req.header('authorization').split(" ")[1];

	// Cogemos la info del body para generar el plato
	const { name, description, price, allergens, vegan, glutenFree, tags } = req.body;

	// Añadimos plato si el token ha sido verificado
	if (verifyToken(token)) {
        // Cogemos el userId de la info del token
	const { userId } = getDataToken(token);
	const {seller,dish,date,completed} = req.body;
    const buyer = userId;
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
	})};
}

// Exportamos como objeto
module.exports = {
	getOrder,
	postOrder
}