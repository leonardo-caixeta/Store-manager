const { productsMock, productMock } = require('./product.mock');

const productsSuccessMock = { status: 'SUCCESSFUL', data: productsMock };

const productSuccessMock = { status: 'SUCCESSFUL', data: productMock };

const productCreatedMock = { status: 'CREATED', data: productMock };

const productDeletedMock = { status: 'DELETED', data: productMock };

module.exports = {
  productsSuccessMock,
  productSuccessMock,
  productCreatedMock,
  productDeletedMock,
};