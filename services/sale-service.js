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

  getSales: async () => {
    const sales = await SaleModel.getSales();
    return sales;
  },

  getSale: async (id) => {
    const sale = await SaleModel.getSale(id);
    return sale;
  },
};

module.exports = SaleService;
