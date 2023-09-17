const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleMock, salesProductsMock } = require('../mocks/sale.mock');
const { salesModel } = require('../../../src/models');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllSales()', function () {
    it('Should return all sales', async function () {
      sinon.stub(connection, 'execute').resolves([salesProductsMock]);

      const sales = await salesModel.getAllSales();

      expect(sales).to.be.an('array');
      expect(sales).to.be.deep.equal(salesProductsMock);
    });
  });

  describe('getSalesById()', function () {
    it('Should return a sale', async function () {
      sinon.stub(connection, 'execute').resolves([salesProductsMock]);

      const sale = await salesModel.getSalesById(saleMock.saleId);

      expect(sale).to.be.an('array');
      expect(sale).to.be.equal(salesProductsMock);
    });
  });

  // describe('createSale()', function () {
  //   const newSalePayload = [
  //     {
  //       productId: 1,
  //       quantity: 1,
  //     },
  //     {
  //       productId: 2,
  //       quantity: 5,
  //     },
  //   ];
  //   it('Should return the created sale', async function () {
  //     // sinon.stub(connection, 'execute').resolves();
  //     sinon.stub(connection, 'query').resolves(newSalePayload);

  //     const sale = await salesModel.createSale(newSalePayload);

  //     expect(sale).to.be.an('object');
  //     expect(sale).to.be.deep.equal(newSalePayload);
  //   });
  // });
});