const express = require('express');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/productos', (req, res) => {
  res.render('products', { products });
});

app.post('/productos', (req, res) => {
  const id = !products.length ? 1 : products.length + 1;
  const newProduct = { ...req.body, id: id };
  products.push(newProduct);
  res.redirect('/productos');
});

const server = app.listen(8080, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Server error: ${error}`));
