const { productsModel } = require('../models');
const schemas = require('./validations/validateNewProduct');

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
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async ({ name }) => {
  const error = schemas.validateNewProduct({ name });
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  const product = await productsModel.createProduct({ name });
  const { insertId } = product[0];
  const newProduct = { id: insertId, name };
  if (!product) {
    return { status: 'CONFLICT', data: product };
  }

  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};