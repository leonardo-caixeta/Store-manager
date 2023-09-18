const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsSuccessMock, productSuccessMock, productCreatedMock, productDeletedMock } = require('../mocks/product.service.mock');

describe('Product Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET - /products', function () {
    it('Should return all products - status 200', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(productsSuccessMock);

      const req = {
        params: { },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsSuccessMock.data);
    });
  });

  describe('GET - /products/:id', function () {
    it('Should return a product - status 200', async function () {
      sinon.stub(productsService, 'getProductsById').resolves(productSuccessMock);

      const req = {
        params: { id: productSuccessMock.data.id },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productSuccessMock.data);
    });
  });

  describe('POST - /products', function () {
    it('Should return the created product - status 201', async function () {
      sinon.stub(productsService, 'createProduct').resolves(productCreatedMock);

      const req = {
        params: {},
        body: {
          name: productCreatedMock.data.name,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreatedMock.data);
    });
  });

  describe('PUT - /products/:id', function () {
    it('Should return the updated product - status 201', async function () {
      sinon.stub(productsService, 'updateProduct').resolves(productSuccessMock);

      const req = {
        params: { id: productSuccessMock.data.id },
        body: {
          name: productSuccessMock.data.name,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.updatedProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productSuccessMock.data);
    });
  });

  describe('DELETE - /products/:id', function () {
    it('Should delete product - status 204', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(productDeletedMock);

      const req = {
        params: { id: productSuccessMock.data.id },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith(null);
    });
  });
});