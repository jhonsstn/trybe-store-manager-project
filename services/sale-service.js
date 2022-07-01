const SaleModel = require('../models/sale-model');

const SaleService = {
  createSale: async () => {
    const newSaleId = SaleModel.createSale();
    return newSaleId;
  },
};

module.exports = SaleService;
