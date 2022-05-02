import Router from 'express';

import { products, carts } from './index.js';

const productsApi = new Router();
const cartsApi = new Router();

const isAdmin = false;

productsApi.get('/', async (req, res, next) => {
  try {
    const data = await products.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
productsApi.get('/:id', async (req, res) => {
  try {
    const item = await products.getById(req.params.id);
    item ? res.send(item) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
  }
});

productsApi.post('/', async (req, res) => {
  const NOMBRE = req.body.nombre;
  const DESCRIPTION = req.body.descripcion;
  const URL_IMG = req.body.foto;
  const PRICE = req.body.precio;
  if (isAdmin) {
    try {
      products.save(NOMBRE, DESCRIPTION, URL_IMG, PRICE);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.json({ error: `403 Forbidden`, desc: `POST reservado para admins` });
  }
});

productsApi.put('/:id', async (req, res) => {
  const ID = req.params.id;
  const NOMBRE = req.body.nombre;
  const DESCRIPTION = req.body.descripcion;
  const URL_IMG = req.body.foto;
  const PRICE = req.body.precio;
  const STOCK = req.body.stock;

  if (isAdmin) {
    try {
      const update = await products.updateProduct(ID, NOMBRE, DESCRIPTION, URL_IMG, PRICE, STOCK);
      update ? res.sendStatus(200) : res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.json({ error: `403 Forbidden`, desc: `PUT reservado para admins` });
  }
});

productsApi.delete('/:id', async (req, res) => {
  if (isAdmin) {
    try {
      const isDeleted = await products.deleteById(req.params.id);
      isDeleted ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.json({ error: `403 Forbidden`, desc: `DELETE reservado para admins` });
  }
});

cartsApi.post('/', async (req, res) => {
  const newCart = await carts.addNewCart();
  res.json(newCart);
});

cartsApi.post('/:id/productos', async (req, res) => {
  const ID = req.params.id;
  const ID_PRODUCT = req.body.id_prod;
  const newCart = await carts.addToCart(ID, ID_PRODUCT);
  if (newCart === true) res.sendStatus(200);else{
    res.json({ error: '404 Not Found', desc: newCart });
  }
});

cartsApi.get('/:id/productos', async (req, res) => {
  const ID = req.params.id;
  try {
    const cartProducts = await carts.getCartProducts(ID);
    cartProducts ? res.json(cartProducts) : res.json({error: `404 Not Found`, desc: `Ups! No encontramos el carrito :O`});
  } catch (error) {
    console.error(error);
  }
});

cartsApi.delete('/:id/productos/:id_prod', async (req, res) => {
  const ID = req.params.id;
  const ID_PRODUCT = req.params.id_prod
  try {
    const cartProducts = await carts.deleteProductFromCart(ID, ID_PRODUCT);
    cartProducts === true ? res.sendStatus(200) : res.json({error: `404 Not Found`, desc: cartProducts});
  } catch (error) {
    console.error(error);
  }
});

cartsApi.delete('/:id', async(req, res)=>{
  const ID = req.params.id
  try {
    const emptyCart = await carts.emptyCart(ID)
    emptyCart === true ? res.sendStatus(200) : res.json({error: `404 Not Found`, desc: emptyCart})
  } catch (error) {
    console.error(error)
  }
})



export { productsApi, cartsApi };
