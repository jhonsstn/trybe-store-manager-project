const db = require('./connection');

const ProductModel = {
  async getProduct(id) {
    const sqlQuery = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await db.query(sqlQuery, [id]);

    return product[0];
  },
  async getProducts() {
    const sqlQuery = 'SELECT * FROM StoreManager.products';
    const [product] = await db.query(sqlQuery);
    return product;
  },

  async createProduct(product) {
    const sqlQuery = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sqlQuery, [product.name]);
    return insertId;
  },
};

module.exports = ProductModel;
