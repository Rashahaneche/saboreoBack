// Variables de entorno
require('dotenv').config()

const express = require('express')
var cors = require('cors')

// Importamos Router
const exampleRouter = require('./routes/exampleRouter.js')

// Config Express
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion inicial a base de datos
const mongoose = require('./utils/database.js');

// Configuracion de Cors Global
app.use(cors())

// Pasamos peticiones a Main Router
app.use('/', exampleRouter)

// Config puerto
app.listen(3000, () => {
  console.log(`Servidor funcionando en http://localhost:3000`)
})
