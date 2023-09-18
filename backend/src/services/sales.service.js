const { salesModel } = require('../models');
const schemas = require('./validations/validateNewSale');
const productsService = require('./products.service');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  if (!sales) {
    return { status: 'CONFLICT', data: sales };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const getSalesById = async (productId) => {
  const sales = await salesModel.getSalesById(productId);

  if (sales.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sales };
};

const createSale = async (newSale) => {
  const error = schemas.validateNewSale(newSale);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const productNotFound = await newSale.reduce(async (acc, { productId }) => {
    const { status, data } = await productsService.getProductsById(productId);
    if (status !== 'SUCCESSFUL') {
      return { status, data };
    }
    return acc;
  }, null);

  if (productNotFound) return productNotFound;

  const sale = await salesModel.createSale(newSale);

  return { status: 'CREATED', data: sale };
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};