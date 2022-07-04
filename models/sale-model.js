const db = require('./connection');

const SaleModel = {
  createSale: async () => {
    const sqlQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await db.query(sqlQuery);

    return insertId;
  },

  createProductSales: async (saleId, product) => {
    const sqlQuery = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`;
    await db.query(sqlQuery, [saleId, product.productId, product.quantity]);
  },

  getSales: async () => {
    const sqlQuery = `
    SELECT sp.sale_id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    ON s.id=sp.sale_id;`;
    const [sales] = await db.query(sqlQuery);
    return sales;
  },

  getSale: async (id) => {
    const sqlQuery = `
    SELECT s.date,
    sp.product_id AS productId,
    sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    ON s.id=sp.sale_id
    WHERE s.id = ?;`;
    const [sale] = await db.query(sqlQuery, [id]);
    return sale;
  },

  saleExists: async (id) => {
    const sqlQuery = `
    SELECT 1
    FROM StoreManager.sales
    WHERE id = ?;`;
    const [[sale]] = await db.query(sqlQuery, [id]);
    return !!sale;
  },

  deleteSale: async (id) => {
    const sqlQuery = 'delete FROM StoreManager.sales WHERE id = ?;';
    await db.query(sqlQuery, [id]);
  },

  updateSale: async (saleId, product) => {
    const sqlQuery = `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ?
    AND product_id = ?;`;
    console.log(product.quantity);
    await db.query(sqlQuery, [product.quantity, saleId, product.productId]);
  },
};

module.exports = SaleModel;
