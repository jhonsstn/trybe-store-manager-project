const Boom = require('@hapi/boom');
const ProductValidator = require('../middlewares/product-validator');
const ProductModel = require('../models/product-model');

const ProductService = {
  async getProduct(id) {
    const product = await ProductModel.getProduct(id);
    if (!product) throw Boom.notFound('Product not found');
    return product;
  },

  async getProducts() {
    const product = await ProductModel.getProducts();
    return product;
  },

  async createProduct(product) {
    await ProductValidator.validateProduct(product);
    const newProduct = await ProductModel.createProduct(product);
    return newProduct;
  },
};

module.exports = ProductService;
