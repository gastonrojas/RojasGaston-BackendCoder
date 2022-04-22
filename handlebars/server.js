const express = require('express');
const handlebars = require('express-handlebars').engine;
const app = express();

const router = require('./main.js');
const handlebarsConig = {
  defaultLayout: 'index.handlebars',
};
app.engine('handlebars', handlebars(handlebarsConig));

app.set('view engine', '.handlebars');

app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(express.static('public'));

const server = app.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.error(`Error en Servidor ${error}`));
