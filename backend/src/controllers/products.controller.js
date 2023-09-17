const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { productsService } = require('../services');

const getAllProducts = async (req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductsById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.createProduct({ name });

  return res.status(mapStatusHTTP(status)).json(data);
};

const updatedProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { status, data } = await productsService.updateProduct({ id, name });

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status } = await productsService.deleteProduct(id);

  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updatedProduct,
  deleteProduct,
};