// const Boom = require('@hapi/boom');
const SaleModel = require('../models/sale-model');
const SaleValidator = require('../middlewares/sale-validator');

const SaleService = {
  createSale: async (sales) => {
    let newSaleId = 0;
    if (Array.isArray(sales)) {
      sales.forEach((sale) => SaleValidator.validateSale(sale));
      const toResolve = [];
      sales.forEach((sale) => {
        toResolve.push(SaleValidator.productExists(sale.productId));
      });
      await Promise.all(toResolve);
      newSaleId = await SaleModel.createSale();
      sales.forEach((sale) => SaleModel.createProductSales(newSaleId, sale));
    } else {
      SaleValidator.validateSale(sales);
      await SaleValidator.productExists(sales.productId);
      newSaleId = await SaleModel.createSale();
      await SaleModel.createProductSales(newSaleId, sales);
    }
    return newSaleId;
  },
};

module.exports = SaleService;
