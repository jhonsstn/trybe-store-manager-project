const db = require('./connection');

const ProductModel = {
  async getProduct(id) {
    const [product] = await db.query(
      `SELECT * FROM StoreManager.products WHERE id = ${id}`,
    );

    return product[0];
  },
  async getProducts() {
    const [product] = await db.query('SELECT * FROM StoreManager.products');
    return product;
  },
};

module.exports = ProductModel;
