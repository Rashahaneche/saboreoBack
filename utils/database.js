const mongoose = require ('mongoose');

// Conexion a base de datos
const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.tfuyc.mongodb.net/saboreo?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})

		console.log ('Conectado correctamente a BBDD')

	} catch (err) {
		console.log('Error conectando a la base de datos.', err);
	}
}

connectDB();
module.exports = mongoose;
