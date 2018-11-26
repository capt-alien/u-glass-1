const express = require('express')
const app = express()
const methodOverride = require('method-override')
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/u-glass');
// Here we go
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

// Make a product
app.post('/products', (req, res) => {
  product.create(req.body).then((product) => {
    console.log(product)
    res.redirect(`/products/${product._id}`)
  }).catch((err) => {
    console.log(err.message)
  })
})
// Change an product you have created
app.put('/products/:id', (req, res) => {
  product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => {
      res.redirect(`/products/${product._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
// Delete an product
app.delete('/products/:id', function (req, res) {
  console.log("DELETE product")
  product.findByIdAndRemove(req.params.id).then((product) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// Model
const product = mongoose.model('product', {
  title: String,
  description: String,
  movieTitle: String,
  date: String
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Index Page
app.get('/', (req, res) => {
  product.find()
    .then(products => {
      res.render('products-index', { products: products });
    })
    .catch(err => {
      console.log(err);
    })
})
// New product
app.get('/products/new', (req, res) => {
  res.render('products-new', {});
})
// About
app.get('/products/about', (req, res) => {
  res.render('products-about', {});
})
// Show product
app.get('/products/:id', (req, res) => {
  product.findById(req.params.id).then((product) => {
    res.render('products-show', { product: product })
  }).catch((err) => {
    console.log(err.message);
  })
})
// Edit product
app.get('/products/:id/edit', (req, res) => {
  product.findById(req.params.id, function(err, product) {
    res.render('products-edit', {product: product});
  })
})
app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})
