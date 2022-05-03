import express from 'express'

import { productsApi, cartsApi } from './src/routes/index.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productsApi);
app.use('/api/carritos', cartsApi)

app.all('*', (req, res) => {
  res.json({error: `404 Not Found`, desc: `Ups! No encontamos la pagina que buscas ='(`})
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
  });
  
  connectedServer.on('error', (error) => console.log(`Error en servidor ${error}`));
  
  