import mongoose from 'mongoose';

import config from '../../config.js';

await mongoose.connect(config.mongodb);

export default class MongodbContainer {
  constructor(collection, schema) {
    this.db = mongoose.model(collection, schema);
  }

  async save(name, description, image, price) {
    const allProdcts = await this.getAll();
    await this.db.create({
      id: !allProdcts.length ? 1 : parseInt(allProdcts[allProdcts.length - 1].id) + 1,
      nombre: name || `caja`,
      descripcion: description || `misteriosa`,
      foto: image || `https://eldiadehoy.net/wp-content/uploads/2016/09/caja-simpsons.jpg`,
      precio: price || 45000,
      stock: 420,
    });
  }

  async getAll() {
    return await this.db.find({}, { _id: 0, __v: 0 });
  }

  async getById(i) {
    return await this.db.findOne({ id: i }, { _id: 0, __v: 0 });
  }

  async deleteById(id) {
    await this.db.deleteOne({ id: id });
  }

  async updateProduct(id, name, description, image, price, stock) {
    const toUpdate = await this.getById(id);
    await this.db.updateOne(
      { id: id },
      {
        $set: {
          id: id,
          nombre: name || toUpdate.nombre,
          descripcion: description || toUpdate.descripcion,
          foto: image || toUpdate.foto,
          precio: price || toUpdate.precio,
          stock: stock || toUpdate.stock,
        },
      }
    );
  }

  async deleteAll() {
    await this.db.deleteMany();
  }
  async addNewCart() {
    const allCarts = await this.getAll();

    await this.db.create({
      id: !allCarts.length ? 1 : parseInt(allCarts[allCarts.length - 1].id) + 1,
      productos: [],
    });
  }

  async addToCart(id, idProduct) {
    const productToAdd = await mongoose
      .model(
        'productos',
        new mongoose.Schema({
          id: Number,
          nombre: String,
          descripcion: String,
          foto: String,
          precio: Number,
          stock: Number,
        })
      )
      .findOne({ id: idProduct }, { _id: 0, __v: 0 });

    const cartToUpdate = await this.getById(id);

    cartToUpdate.productos.push(productToAdd);

    await this.db.updateOne(
      { id: id },
      {
        $set: {
          productos: cartToUpdate.productos,
        },
      }
    );
  }

  async getCartProducts(id) {
    const cartProducts = await this.getById(id);
    return cartProducts.productos;
  }

  async deleteProductFromCart(id, idProduct) {
    const cart = await this.getById(id);
    if (!cart) return `Ups! No encontramos el carrito que buscas...`;
    const productIndex = cart.productos.findIndex((prod) => prod.id === idProduct);
    if (productIndex > -1) {
      cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
    } else if (productIndex === -1) return `Ups! No encontramos ese producto en tu carrito`;

    await this.db.updateOne(
      { id: id },
      {
        $set: {
          productos: [...cart.productos],
        },
      }
    );
  }

  async emptyCart(id){
    await this.db.updateOne(
        { id: id },
        {
          $set: {
            productos: [],
          },
        }
      );
  }
}

// await mongoose.connect(config.mongodb);

// const products = new MongodbContainer(
//   'productos',
//   new mongoose.Schema({
//     id: Number,
//     nombre: String,
//     descripcion: String,
//     foto: String,
//     precio: Number,
//     stock: Number,
//   })
// );

// const carts = new MongodbContainer(
//   'carritos',
//   new mongoose.Schema({
//     id: Number,
//     productos: Array,
//   })
// );


