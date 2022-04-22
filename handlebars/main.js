const { Router } = require('express');
const router = Router();

const products = [
  {
    id: 1,
    title: 'Buzo',
    price: 6000,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Hooded_top-512.png',
  },
  {
    id: 2,
    title: 'Remera',
    price: 2500,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/T-Shirt-512.png',
  },
  {
    id: 3,
    title: 'Vestido',
    price: 8000,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Dress-512.png',
  },
];

router.get('/', (req, res) => {
  res.render('form.handlebars');
});

router.get('/productos', (req, res) => {
  res.render('products.handlebars', { products });
});

router.post('/productos', (req, res) => {
  const id = !products.length ? 1 : products.length + 1;
  const newProduct = { ...req.body, id: id };
  products.push(newProduct);
  res.redirect('/productos');
});

module.exports = router;
