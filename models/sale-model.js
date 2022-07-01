const db = require('./connection');

const SaleModel = {
  createSale: async () => {
    const sqlQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await db.query(sqlQuery);

    return insertId;
  },

  createProductSales: async (saleId, product) => {
    const sqlQuery = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    await db.query(sqlQuery, [saleId, product.productId, product.quantity]);
  },
};

module.exports = SaleModel;
