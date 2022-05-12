const connectionConfig = require('./config/index.js')

const knexSqlite = require('knex')(connectionConfig.sqlite3ConnectionConfig)


const createMessagesTable = async () => {
    try {
        const isMessages = await knexSqlite.schema.hasTable('messages')
       
        if (isMessages){
            console.log('tabla de mensajes existe')
        } else{
            await  knexSqlite.schema
            .createTable('messages', (tabla) => {
              tabla.string('email');
              tabla.string('text')
              tabla.string('date');
            })
            console.log('tabla creada')
        }
        await knexSqlite.destroy()
    } catch (error) {
        console.log(error)
    }

}

module.exports = createMessagesTable, knexSqlite
// knex.schema.hasTable('mensajes').then((exists) => {
//     if (!exists) {
//       knex.schema
//         .createTable('mensajes', (tabla) => {
//           tabla.string('email');
//           tabla.string('text')
//           tabla.string('date');
//         })
//         .then(() => {
//           console.log('tabla de mansajes creadao');
//         });
//     } else {
//         console.log('existe la tabla mensajes') 
//     }
//   }).finally(()=>{
//       knex.destroy()
//   })

