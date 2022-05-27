import config from '../../../config.js'
import mongoose from 'mongoose';

let carritosDao

switch (config.env) {
    case 'json':
        const { default: FileSystemCartsDAO } = await import('./FileSystemCartsDAO.js')
        carritosDao = new FileSystemCartsDAO(config.dbPath)
        break
    case 'firebase':
        const { default: FirestoreCartsDAO } = await import('./FirestoreCartsDAO.js')
        carritosDao = new FirestoreCartsDAO('carritos', config.firestore)
        break
    case 'mongodb':
        const { default: MongodbCartsDAO } = await import('./MongodbCartsDAO.js')
        carritosDao = new MongodbCartsDAO(
            'carritos',
            new mongoose.Schema({
              id: Number,
              productos: Array,
            }))
        break
    default:
        const { default: MemoryCartsDAO } = await import('./MemoryCartsDAO.js')
        carritosDao = new MemoryCartsDAO()
        break
}

export { carritosDao }