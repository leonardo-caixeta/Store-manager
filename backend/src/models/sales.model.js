const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT s.id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM sales s
  INNER JOIN sales_products sp
    ON s.id = sp.sale_id
  ORDER BY s.id, sp.product_id;
  `);
  return sales;
};

const getSalesById = async (saleId) => {
  const [sale] = await connection.execute(`
  SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM sales s
  INNER JOIN sales_products sp ON s.id = sp.sale_id
  WHERE sale_id = ?
  ORDER BY s.id, sp.product_id;
  `, [saleId]);

  return sale;
};

const createSale = async (newSale) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales () VALUES ();
  `);
  const mappedNewSale = newSale.map(({ productId, quantity }) => [insertId, productId, quantity]);

  await connection.query(`
    INSERT INTO sales_products
    (sale_id, product_id, quantity) VALUES ?;
  `, [mappedNewSale]);

  return { id: insertId, itemsSold: newSale };
};

const deleteSale = async (id) => {
  await connection.execute(`
    DELETE FROM sales WHERE id = (?);
  `, [id]);

  return id;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  deleteSale,
};