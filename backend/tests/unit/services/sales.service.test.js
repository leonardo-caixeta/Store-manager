const { expect } = require('chai');
const sinon = require('sinon');
const { productsSuccessMock, productSuccessMock, productNotFoundMock, productCreatedMock, productDeletedMock } = require('../mocks/product.service.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Product Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllProducts()', function () {
    it('Should return a success response with products', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsSuccessMock.data);

      const products = await productsService.getAllProducts();

      expect(products).to.be.an('object');
      expect(products).to.be.deep.equal(productsSuccessMock);
    });
  });

  describe('getProductsById()', function () {
    it('Should return a success response with a product', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(productSuccessMock.data);

      const product = await productsService.getProductsById(productSuccessMock.data.id);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productSuccessMock);
    });

    it('Should return a not found response if product not exists', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      const product = await productsService.getProductsById(productSuccessMock.data.id);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productNotFoundMock);
    });
  });

  describe('createProduct()', function () {
    it('Should return a success response with the created product', async function () {
      sinon.stub(productsModel, 'createProduct').resolves(productCreatedMock.data);

      const product = await productsService.createProduct({ name: productCreatedMock.data.name });

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productCreatedMock);
    });

    it('Should return a required error response', async function () {
      const product = await productsService.createProduct({});

      expect(product).to.be.an('object');
      expect(product.status).to.be.an('string');
      expect(product.data.message).to.be.an('string');
      expect(product.status).to.be.equal('REQUIRED_VALUE');
    });

    it('Should return a invalid error response', async function () {
      const product = await productsService.createProduct({ name: 1 });

      expect(product).to.be.an('object');
      expect(product.status).to.be.an('string');
      expect(product.data.message).to.be.an('string');
      expect(product.status).to.be.equal('INVALID_VALUE');
    });
  });

  describe('updateProduct()', function () {
    it('Should return a success response with the updated product', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(productSuccessMock.data);
      sinon.stub(productsModel, 'updateProduct').resolves(productSuccessMock.data);

      const product = await productsService.updateProduct({ name: productSuccessMock.data.name });

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productSuccessMock);
    });

    it('Should return a not found response if product not exists', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      const product = await productsService.updateProduct({ name: productSuccessMock.data.name });

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productNotFoundMock);
    });

    it('Should return a required error response', async function () {
      const product = await productsService.updateProduct({});

      expect(product).to.be.an('object');
      expect(product.status).to.be.an('string');
      expect(product.data.message).to.be.an('string');
      expect(product.status).to.be.equal('REQUIRED_VALUE');
    });

    it('Should return a invalid error response', async function () {
      const product = await productsService.updateProduct({ name: 1 });

      expect(product).to.be.an('object');
      expect(product.status).to.be.an('string');
      expect(product.data.message).to.be.an('string');
      expect(product.status).to.be.equal('INVALID_VALUE');
    });
  });
  describe('deleteProducts()', function () {
    it('Should return a success response with products', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(productSuccessMock.data);
      sinon.stub(productsModel, 'deleteProduct').resolves(undefined);

      const deletedProduct = await productsService.deleteProduct(productSuccessMock.data.id);

      expect(deletedProduct).to.be.deep.equal(productDeletedMock);
    });

    it('Should return a not found response if product not exists', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      const product = await productsService.deleteProduct(productSuccessMock.data.id);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productNotFoundMock);
    });
  });
});