const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) {
    return { status: 'CONFLICT', data: products };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const getProductsById = async (productId) => {
  const product = await productsModel.getProductsById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: product };
  }

  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductsById,
};