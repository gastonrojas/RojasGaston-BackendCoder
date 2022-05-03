import Router from 'express';

import { carts } from '../../containers/containers.js';

export const cartsApi = new Router();

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


  