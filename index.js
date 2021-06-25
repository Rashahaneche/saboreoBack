// Variables de entorno
require('dotenv').config()

const express = require('express')
var cors = require('cors')

// Importamos Routers
const exampleRouter = require('./routes/exampleRouter.js')
const userRouter = require ('./routes/userRouter.js')

// Config Express
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion inicial a base de datos
const mongoose = require('./utils/database.js');

// Configuracion de Cors Global
app.use(cors())

// Dividimos peticiones en los routers
// app.use('/', exampleRouter)
app.use('/user', userRouter)

// Config puerto
app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:3000`)
})
