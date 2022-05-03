import Router from 'express';

import { products } from '../../containers/containers.js';

export const productsApi = new Router();

const isAdmin = true;

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
