const Boom = require('@hapi/boom');

const SaleValidator = {
  validateSale: (sale) => {
    if (!sale.productId) {
      throw Boom.badRequest('"productId" is required');
    }
    if (sale.quantity === undefined) {
      throw Boom.badRequest('"quantity" is required');
    }
    if (sale.quantity < 1) {
      throw Boom.badData('"quantity" must be greater than or equal to 1');
    }
  },
};

module.exports = SaleValidator;
