const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/sale-controller');

const route = Router();

route.post('/', rescue(saleController.createSale));

route.get('/:id', rescue(saleController.getSale));

route.get('/', rescue(saleController.getSales));

route.delete('/:id', rescue(saleController.deleteSale));

module.exports = route;
