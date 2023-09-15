const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(`
    SELECT * FROM products
    ORDER BY id ;
  `);
  return products;
};

const getProductsById = async (productId) => {
  const [[product]] = await connection.execute(`
    SELECT * FROM products
    WHERE id = ?;
  `, [productId]);

  return product;
};

const createProduct = async ({ name }) => {
  const product = await connection.execute(`
    INSERT INTO products (name) VALUES (?)
  `, [name]);

  return product;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};