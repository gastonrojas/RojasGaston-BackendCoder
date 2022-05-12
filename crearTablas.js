const createProductsTable = require('./src/crearTablaProductos.js')
const createMessagesTable = require('./src/creartablaMensajes.js')

const createTables = async () => {
    try {
        await createProductsTable()
        await createMessagesTable()
    } catch (error) {
        console.log(error)
    }
}

createTables()

