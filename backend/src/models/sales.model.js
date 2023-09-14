const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(`
    SELECT * FROM sales
    ORDER BY id ;
  `);
  return products;
};

const getProductsById = async (productId) => {
  const [[product]] = await connection.execute(`
    SELECT * FROM sales
    WHERE id = ?;
  `, [productId]);

  return product;
};

module.exports = {
  getAllProducts,
  getProductsById,
};