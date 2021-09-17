// Variables de entorno
require('dotenv').config()

const express = require('express')
const cors = require('cors')

// Importamos Routers
const userRouter = require ('./routes/userRouter.js')
const dishRouter = require ('./routes/dishRouter.js')
const orderRouter= require ('./routes/orderRouter')
const fileRouter= require ('./routes/fileRouter.js')

// Config Express
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion inicial a base de datos
const runDataBase = require('./utils/database.js');
runDataBase();

// const corsOptions = {
//   origin: "http://localhost:3000"
// };

// Configuracion de Cors Global
app.use(cors())

app.use('/static', express.static('uploads'))

// Dividimos peticiones en los routers
// app.use('/', exampleRouter)
app.use('/user', userRouter)
app.use('/dish', dishRouter)
app.use('/order', orderRouter)
app.use('/upload', fileRouter)
const PORT= process.env.PORT||3000 ;
// Config puerto
app.listen(PORT, () => {
  console.log(`Servidor funcionando en ${Port}`);
})
