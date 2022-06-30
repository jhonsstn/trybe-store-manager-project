const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/product-controller');

const route = Router();

route.get('/', rescue(productController.getProducts));

route.get('/:id', rescue(productController.getProduct));

module.exports = route;
