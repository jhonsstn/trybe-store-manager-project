// const Boom = require('@hapi/boom');
const SaleModel = require('../models/sale-model');
const SaleValidator = require('../middlewares/sale-validator');

const SaleService = {
  createSale: async (sales) => {
    if (Array.isArray(sales)) {
      sales.forEach((sale) => SaleValidator.validateSale(sale));
      const toResolve = [];
      for (let index = 0; index < sales.length; index += 1) {
        toResolve.push(SaleValidator.productExists(sales[index].productId));
      }
      await Promise.all(toResolve);
    } else {
      SaleValidator.validateSale(sales);
      await SaleValidator.productExists(sales.productId);
    }
    const newSaleId = SaleModel.createSale();
    return newSaleId;
  },
};

module.exports = SaleService;
