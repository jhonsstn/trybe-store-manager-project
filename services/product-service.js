const Boom = require('@hapi/boom');
const ProductModel = require('../models/product-model');

const ProductService = {
  async getProduct(id) {
    const product = await ProductModel.getProduct(id);
    if (!product) throw Boom.notFound('Product not found');
    return product;
  },
};

module.exports = ProductService;
