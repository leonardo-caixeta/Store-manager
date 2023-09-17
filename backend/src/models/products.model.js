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
  const [{ insertId }] = await connection.execute(`
    INSERT INTO products (name) VALUES (?);
  `, [name]);

  return { id: insertId, name };
};

const updateProduct = async ({ id, name }) => {
  await connection.execute(`
    UPDATE products SET name = (?) WHERE id = (?);
  `, [name, id]);

  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(`
    DELETE FROM products WHERE ID = (?)
  `, [id]);

  return id;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};