const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesSuccessMock, saleSuccessMock, saleCreatedMock } = require('../mocks/sale.service.mock');

describe('Product Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET - /sales', function () {
    it('Should return all sales - status 200', async function () {
      sinon.stub(salesService, 'getAllSales').resolves(salesSuccessMock);

      const req = {
        params: { },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesSuccessMock.data);
    });
  });

  describe('GET - /sales/:id', function () {
    it('Should return a product - status 200', async function () {
      sinon.stub(salesService, 'getSalesById').resolves(saleSuccessMock);

      const req = {
        params: { id: saleSuccessMock.data.saleId },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleSuccessMock.data);
    });
  });

  describe('POST - /sales', function () {
    it('Should return the created sale - status 201', async function () {
      sinon.stub(salesService, 'createSale').resolves(saleCreatedMock);

      const req = {
        params: {},
        body: saleCreatedMock.data.itemsSold,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreatedMock.data);
    });
  });
});