const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/product-controller');

const route = Router();

route.get('/', rescue(productController.getProducts));

module.exports = route;
