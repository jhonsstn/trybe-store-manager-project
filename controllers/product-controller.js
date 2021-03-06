const ProductService = require('../services/product-service');

const ProductController = {
  getProduct: async (req, res) => {
    const product = await ProductService.getProduct(req.params.id);
    res.status(200).json(product);
  },
  getProducts: async (_req, res) => {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  },

  createProduct: async (req, res) => {
    const productId = await ProductService.createProduct(req.body);
    res.status(201).json({ id: productId, ...req.body });
  },

  updateProduct: async (req, res) => {
    await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  },

  deleteProduct: async (req, res) => {
    await ProductService.deleteProduct(req.params.id);
    res.sendStatus(204);
  },

  getProductsByName: async (req, res) => {
    const products = await ProductService.getProductsByName(req.query.q);
    res.status(200).json(products);
  },
};

module.exports = ProductController;
