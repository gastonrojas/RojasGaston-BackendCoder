const createProductsTable = require('./tablaProductos/crearTablaProductos')
const createMessagesTable = require('./tablaMensajes/creartablaMensajes.js')

const createTables = async () => {
    try {
        await createProductsTable()
        await createMessagesTable()
    } catch (error) {
        console.log(error)
    }
}

createTables()

