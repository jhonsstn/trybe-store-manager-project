const Boom = require('@hapi/boom');
const ProductModel = require('../models/product-model');

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

  productExists: async (productId) => {
    const product = await ProductModel.productExists(productId);
    if (!product) throw Boom.notFound('Product not found');
  },
};

module.exports = SaleValidator;
