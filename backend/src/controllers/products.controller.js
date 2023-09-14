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

module.exports = {
  getAllProducts,
  getProductsById,
};