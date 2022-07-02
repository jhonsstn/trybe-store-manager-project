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
    select sp.sale_id as saleId,
    s.date,
    sp.product_id as productId,
    sp.quantity
    from StoreManager.sales_products as sp
    join StoreManager.sales as s
    on s.id=sp.sale_id;`;
    const [sales] = await db.query(sqlQuery);
    return sales;
  },

  getSale: async (id) => {
    const sqlQuery = `
    select s.date,
    sp.product_id as productId,
    sp.quantity
    from StoreManager.sales_products as sp
    join StoreManager.sales as s
    on s.id=sp.sale_id
    where s.id = ?;`;
    const [sale] = await db.query(sqlQuery, [id]);
    return sale;
  },

  deleteSale: async (id) => {
    const sqlQuery = 'delete from StoreManager.sales where id = ?;';
    await db.query(sqlQuery, [id]);
  },
};

module.exports = SaleModel;
