// Variables de entorno
require('dotenv').config()

const express = require('express')
const cors = require('cors')

// Importamos Routers
const userRouter = require ('./routes/userRouter.js')
const dishRouter = require ('./routes/dishRouter.js')

// Config Express
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion inicial a base de datos
const runDataBase = require('./utils/database.js');
runDataBase();

// Configuracion de Cors Global
app.use(cors())

// Dividimos peticiones en los routers
// app.use('/', exampleRouter)
app.use('/user', userRouter)
app.use('/dish', dishRouter)

// Config puerto
app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:3000`)
})
