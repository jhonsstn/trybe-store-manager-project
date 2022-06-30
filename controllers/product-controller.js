const ProductService = require('../services/product-service');

const ProductController = {
  async getProduct(req, res) {
    const product = await ProductService.getProduct(req.params.id);
    res.status(200).json(product);
  },
  async getProducts(_req, res) {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  },

  async createProduct(req, res) {
    const productId = await ProductService.createProduct(req.body);
    res.status(201).json({ id: productId, ...req.body });
  },
};

module.exports = ProductController;
