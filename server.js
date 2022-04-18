const express = require('express');
const app = express();

const router = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', router);
app.use(express.static('public'));

const server = app.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.error(`Error en Servidor ${error}`));
