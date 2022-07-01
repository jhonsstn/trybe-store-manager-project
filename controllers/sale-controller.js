const SaleService = require('../services/sale-service');

const SaleController = {
  createSale: async (req, res) => {
    const newSaleId = await SaleService.createSale(req.body);
    const itemsSold = Array.isArray(req.body) ? [...req.body] : [req.body];
    const sale = { id: newSaleId, itemsSold };
    res.status(201).json(sale);
  },

  getSales: async (_req, res) => {
    const sales = await SaleService.getSales();
    res.status(200).json(sales);
  },

  getSale: async (req, res) => {
    const sale = await SaleService.getSale(req.params.id);
    res.status(200).json(sale);
  },
};

module.exports = SaleController;
