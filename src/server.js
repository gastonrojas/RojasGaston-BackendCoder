const express = require('express');

const { saveMessage, getAllMessages } = require('./index');
const products = require('./products')

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on('connection', (socket) => {
  socket.emit('products', products);

  getAllMessages().then((messages) => {
    socket.emit('messages', messages);
  });
  
  socket.on('newProduct', (newProduct) => {
    products.push(newProduct);
    io.sockets.emit('products', products);
  });

  socket.on('newMessage', (message) => {
    saveMessage(message).then((get) => {
      getAllMessages().then((messages) => {
        io.sockets.emit('messages', messages);
      });
    });
  });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const connectedServer = httpServer.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on('error', (error) => console.log(`Error en servidor ${error}`));

