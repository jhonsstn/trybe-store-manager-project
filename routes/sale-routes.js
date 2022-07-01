const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/sale-controller');

const route = Router();

route.post('/', rescue(saleController.createSale));

module.exports = route;
