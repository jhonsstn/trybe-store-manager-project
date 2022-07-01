const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/sale-controller');

const route = Router();

route.post('/', rescue(saleController.createSale));

route.get('/:id', rescue(saleController.getSale));

route.get('/', rescue(saleController.getSales));

module.exports = route;
