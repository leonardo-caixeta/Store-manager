const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { salesService } = require('../services');

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.getAllSales();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSalesById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const newSale = req.body;
  const { status, data } = await salesService.createSale(newSale);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};