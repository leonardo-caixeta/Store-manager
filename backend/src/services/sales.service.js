const { salesModel } = require('../models');

const getAllProducts = async () => {
  const products = await salesModel.getAllProducts();
  if (!products) {
    return { status: 'CONFLICT', data: products };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const getProductsById = async (productId) => {
  const product = await salesModel.getProductsById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: product };
  }

  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductsById,
};