const db = require('./connection');

const ProductModel = {
  getProduct: async (id) => {
    const sqlQuery = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await db.query(sqlQuery, [id]);

    return product[0];
  },
  getProducts: async () => {
    const sqlQuery = 'SELECT * FROM StoreManager.products';
    const [product] = await db.query(sqlQuery);
    return product;
  },

  createProduct: async (product) => {
    const sqlQuery = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sqlQuery, [product.name]);
    return insertId;
  },

  productExists: async (productId) => {
    const sqlQuery = 'SELECT 1 FROM StoreManager.products WHERE id = ?';
    const [[product]] = await db.query(sqlQuery, [productId]);
    return !!product;
  },
};

module.exports = ProductModel;
