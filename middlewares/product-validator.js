const Boom = require('@hapi/boom');

const ProductValidator = {
  validateProduct(product) {
    if (!product.name) {
      throw Boom.badRequest('"name" is required');
    }
    if (!product.name.length < 5) {
      throw Boom.badData('"name" length must be at least 5 characters long');
    }
  },
};

module.exports = ProductValidator;
