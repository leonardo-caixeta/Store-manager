const { productsModel } = require('../models');
const schemas = require('./validations/validateNewProduct');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

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

  return { status: 'CREATED', data: product };
};

const updateProduct = async ({ id, name }) => {
  const { status, data } = await getProductsById(id);

  if (status !== 'SUCCESSFUL') return { status, data };

  const error = schemas.validateNewProduct({ name });

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const updatedProduct = await productsModel.updateProduct({ id, name });

  return { status: 'SUCCESSFUL', data: updatedProduct };
};

const deleteProduct = async (id) => {
  const { status, data } = await getProductsById(id);

  if (status !== 'SUCCESSFUL') return { status, data };

  await productsModel.deleteProduct(id);

  return { status: 'DELETED', data: null };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};