const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/product-controller');

const route = Router();

route.get('/search', rescue(productController.getProductsByName));

route.get('/', rescue(productController.getProducts));

route.get('/:id', rescue(productController.getProduct));

route.post('/', rescue(productController.createProduct));

route.put('/:id', rescue(productController.updateProduct));

route.delete('/:id', rescue(productController.deleteProduct));

module.exports = route;
