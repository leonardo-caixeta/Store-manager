const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsMock, productMock } = require('../mocks/product.mock');
const { productsModel } = require('../../../src/models');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllProducts()', function () {
    it('Should return all products', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await productsModel.getAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(productsMock);
    });
  });

  describe('getProductsById()', function () {
    it('Should return a product', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const product = await productsModel.getProductsById(productMock.id);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productMock);
    });
  });

  describe('createProduct()', function () {
    it('Should return the created product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: productMock.id }]);

      const product = await productsModel.createProduct({ name: productMock.name });

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productMock);
    });
  });

  describe('updateProduct()', function () {
    it('Should return the updated product', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const product = await productsModel.updateProduct(productMock);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productMock);
    });
  });

  describe('deleteProduct()', function () {
    it('Should return the deleted ID', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const deletedProductid = await productsModel.deleteProduct(productMock.id);

      expect(deletedProductid).to.be.an('number');
      expect(deletedProductid).to.be.deep.equal(productMock.id);
    });
  });
});