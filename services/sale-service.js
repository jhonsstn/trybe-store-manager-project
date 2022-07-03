// const Boom = require('@hapi/boom');
const Boom = require('@hapi/boom');
const SaleModel = require('../models/sale-model');
const SaleValidator = require('../middlewares/sale-validator');

const SaleService = {
  createSale: async (sales) => {
    const toResolve = [];
    sales.forEach((sale) => {
      SaleValidator.validateSale(sale);
      toResolve.push(SaleValidator.productExists(sale.productId));
    });
    await Promise.all(toResolve);
    const newSaleId = await SaleModel.createSale();
    sales.forEach((sale) => SaleModel.createProductSales(newSaleId, sale));

    return newSaleId;
  },

  getSales: async () => {
    const sales = await SaleModel.getSales();
    return sales;
  },

  getSale: async (id) => {
    const sale = await SaleModel.getSale(id);
    if (sale.length === 0) {
      throw Boom.notFound('Sale not found');
    }
    return sale;
  },

  deleteSale: async (id) => {
    const sale = await SaleModel.saleExists(id);
    if (!sale) {
      throw Boom.notFound('Sale not found');
    }
    await SaleModel.deleteSale(id);
  },
};

module.exports = SaleService;
