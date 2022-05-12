const connectionConfig = require('./config/index.js')

const knexMysql = require('knex')(connectionConfig.mysql2ConnectionConfig)

const createProductsTable = async ()=> {
    try {
        const isProducts = await knexMysql.schema.hasTable('productos')
        if(isProducts){
          console.log('tabla de productos existe')
        } else{
          await  knexMysql.schema
          .createTable('productos', (tabla) => {
            tabla.increments('id');
            tabla.string('title');
            tabla.integer('price')
            tabla.string('picture');
          })
          console.log('tabla de productos creada')
        }
        await knexMysql.destroy()
    } catch (error) {
        console.log(error)
    }
}
module.exports = createProductsTable, knexMysql


