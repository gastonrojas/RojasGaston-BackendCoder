const { Router } = require('express');
const router = Router();

const products = [];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const productoSolicitado = products[parseInt(req.params.id) - 1];
  productoSolicitado ? res.json(productoSolicitado) : res.json({ error: 'producto no encontrado' });
});

router.post('/', (req, res) => {
  const id = !products.length ? 1 : products.length + 1;
  const newProduct = { ...req.body, id: id };
  products.push(newProduct);
  res.json(newProduct);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const modifiedProduct = { ...req.body, id: id };
  products[id - 1] = modifiedProduct;
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products.splice(id - 1, 1);
});

module.exports = router;
