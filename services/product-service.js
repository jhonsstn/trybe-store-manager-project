const Boom = require('@hapi/boom');
const ProductValidator = require('../middlewares/product-validator');
const ProductModel = require('../models/product-model');

const ProductService = {
  getProduct: async (id) => {
    const product = await ProductModel.getProduct(id);
    if (!product) throw Boom.notFound('Product not found');
    return product;
  },

  getProducts: async () => {
    const products = await ProductModel.getProducts();
    return products;
  },

  createProduct: async (product) => {
    ProductValidator.validateProduct(product);
    const newProductId = await ProductModel.createProduct(product);
    return newProductId;
  },

  updateProduct: async (id, product) => {
    ProductValidator.validateProduct(product);
    const productToUpdate = await ProductModel.getProduct(id);
    if (!productToUpdate) throw Boom.notFound('Product not found');
    await ProductModel.updateProduct(id, product);
  },

  deleteProduct: async (id) => {
    const productToDelete = await ProductModel.getProduct(id);
    if (!productToDelete) throw Boom.notFound('Product not found');
    await ProductModel.deleteProduct(id);
  },
};

module.exports = ProductService;
