const SaleService = require('../services/sale-service');

const SaleController = {
  createSale: async (req, res) => {
    const newSaleId = await SaleService.createSale(req.body);
    const sale = { id: newSaleId, itemsSold: [...req.body] };
    res.status(201).json(sale);
  },
};

module.exports = SaleController;
