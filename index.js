const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${4000}`);
});