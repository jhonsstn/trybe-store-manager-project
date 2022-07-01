const db = require('./connection');

const SaleModel = {
  createSale: async () => {
    const sqlQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await db.query(sqlQuery);

    return insertId;
  },
};

module.exports = SaleModel;
