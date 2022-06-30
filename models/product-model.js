const db = require('./connection');

const ProductModel = {
  async getProduct(id) {
    const [product] = await db.query(`SELECT * FROM products WHERE id = ${id}`);
    return product[0];
  },
  async getProducts() {
    const [product] = await db.query('SELECT * FROM products}');
    return product;
  },
};

module.exports = ProductModel;
