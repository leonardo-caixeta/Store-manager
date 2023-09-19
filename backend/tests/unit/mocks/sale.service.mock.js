const { saleMock, salesProductsMock } = require('./sale.mock');

const saleSuccessMock = { status: 'SUCCESSFUL', data: saleMock };

const salesSuccessMock = { status: 'SUCCESSFUL', data: salesProductsMock };

const saleNotFoundMock = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

const returnCreatedMock = {
  id: saleMock.saleId,
  itemsSold: {
    productId: saleMock.productId,
    quantity: saleMock.quantity,
  },
};

const saleCreatedMock = { status: 'CREATED', data: returnCreatedMock };

const saleDeletedMock = { status: 'DELETED', data: null };

module.exports = {
  saleSuccessMock,
  salesSuccessMock,
  saleNotFoundMock,
  saleCreatedMock,
  saleDeletedMock,
};