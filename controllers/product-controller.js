const ProductService = require('../services/product-service');

const ProductController = {
  async getProduct(req, res) {
    const product = await ProductService.getProduct(req.params.id);
    res.status(200).json(product);
  },
};

module.exports = ProductController;
