const { expect } = require('chai');
const sinon = require('sinon');
const { saleSuccessMock, saleNotFoundMock, salesSuccessMock, saleCreatedMock } = require('../mocks/sale.service.mock');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { productSuccessMock } = require('../mocks/product.service.mock');
const { saleMock } = require('../mocks/sale.mock');

describe('Sale Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllSales()', function () {
    it('Should return a success response with sales', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(salesSuccessMock.data);

      const sales = await salesService.getAllSales();

      expect(sales).to.be.an('object');
      expect(sales).to.be.deep.equal(salesSuccessMock);
    });
  });

  describe('getSalesById()', function () {
    it('Should return a success response with a sale', async function () {
      sinon.stub(salesModel, 'getSalesById').resolves(salesSuccessMock.data);

      const sale = await salesService.getSalesById(saleSuccessMock.data.saleId);

      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(salesSuccessMock);
    });

    it('Should return a not found response if sale not exists', async function () {
      sinon.stub(salesModel, 'getSalesById').resolves([]);

      const sale = await salesService.getSalesById(saleSuccessMock.data.saleId);

      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(saleNotFoundMock);
    });
  });

  describe('createSale()', function () {
    it('Should return a success response with the created sale', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(productSuccessMock.data);
      sinon.stub(salesModel, 'createSale').resolves(saleCreatedMock.data);

      const sale = await salesService.createSale([{ productId: saleMock.productId, quantity: saleMock.quantity }]);

      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(saleCreatedMock);
    });

    it('Should return a required productId error response', async function () {
      const sale = await salesService.createSale([
        {
          quantity: 1,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale.status).to.be.an('string');
      expect(sale.data.message).to.be.an('string');
      expect(sale.status).to.be.equal('REQUIRED_VALUE');
    });

    it('Should return a required quantity error response', async function () {
      const sale = await salesService.createSale([
        {
          productId: 1,
        },
      ]);

      expect(sale).to.be.an('object');
      expect(sale.status).to.be.an('string');
      expect(sale.data.message).to.be.an('string');
      expect(sale.status).to.be.equal('REQUIRED_VALUE');
    });
  });
});