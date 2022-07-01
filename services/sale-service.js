const SaleModel = require('../models/sale-model');
const SaleValidator = require('../middlewares/sale-validator');

const SaleService = {
  createSale: async (sales) => {
    if (Array.isArray(sales)) {
      sales.forEach((sale) => SaleValidator.validateSale(sale));
    } else {
      SaleValidator.validateSale(sales);
    }
    const newSaleId = SaleModel.createSale();
    return newSaleId;
  },
};

module.exports = SaleService;
