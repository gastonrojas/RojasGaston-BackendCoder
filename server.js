const express = require('express');

const connectionConfig = require('./src/config/index.js');
const knexMysql = require('knex')(connectionConfig.mysql2ConnectionConfig);
const knexSqlite = require('knex')(connectionConfig.sqlite3ConnectionConfig);

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on('connection', async (socket) => {
  knexMysql
    .select()
    .table('productos')
    .then((productos) => {
      socket.emit('products', productos);
    });
  
  knexSqlite
    .select()
    .table('messages')
    .then((messages) => {
      socket.emit('messages', messages);
    });


  socket.on('newProduct', async (newProduct) => {
    await knexMysql('productos').insert(newProduct);
    knexMysql
      .select()
      .table('productos')
      .then((productos) => {
        io.sockets.emit('products', productos);
      });
  });

  socket.on('newMessage', async(newMessage)=>{
    await knexSqlite('messages').insert(newMessage)
    knexSqlite.select().table('messages').then(messages=>{
      io.sockets.emit('messages', messages)
    })
  })

});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const connectedServer = httpServer.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on('error', (error) => console.log(`Error en servidor ${error}`));
