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
  const [sales] = await connection.execute(`
  SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM sales s
  INNER JOIN sales_products sp ON s.id = sp.sale_id
  WHERE sale_id = ?
  ORDER BY s.id, sp.product_id;
  `, [saleId]);

  return sales;
};

const createSale = async (newSale) => {
  const pool = await connection.getConnection();
  try {
    await pool.beginTransaction();

    const [{ insertId }] = await pool.query(`
    INSERT INTO sales () VALUES ();
    `);
    const mappedNewSale = newSale.map(({ productId, quantity }) => [insertId, productId, quantity]);

    await pool.query(`
      INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES ?;
    `, [mappedNewSale]);

    await pool.commit();

    return { id: insertId, itemsSold: newSale };
  } catch (error) {
    await pool.rollback();
    throw error;
  } finally { pool.release(); }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};