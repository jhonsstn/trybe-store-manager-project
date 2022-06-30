const Boom = require('@hapi/boom');
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
    const newProduct = await ProductModel.createProduct(product);
    return newProduct;
  },
};

module.exports = ProductService;
