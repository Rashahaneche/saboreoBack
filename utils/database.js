const mongoose = require ('mongoose');

// Conexion a base de datos
mongoose.connect(`mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.tfuyc.mongodb.net/saboreo?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})


	.then(dbConnection => console.log ('Conectado correctamente a BBDD'))
	.catch(err => console.log('Error al conectar con la BBDD: ', err ));

module.exports = mongoose;
