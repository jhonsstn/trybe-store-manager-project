const { describe } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const ProductModel = require('../../../models/product-model');
const ProductService = require('../../../services/product-service');
const ProductValidator = require('../../../middlewares/product-validator');
chai.use(require('chai-as-promised'));

describe('ProductService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a product if calls getProduct with correct id', async () => {
    sinon
      .stub(ProductModel, 'getProduct')
      .resolves({ id: 1, name: 'Produto 1' });
    const result = await ProductService.getProduct(1);
    expect(result.id).to.equal(1);
  });

  it('should return a product list if getProducts is called', async () => {
    const productList = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    const getProductsStub = sinon
      .stub(ProductModel, 'getProducts')
      .resolves(productList);
    const result = await ProductService.getProducts();

    expect(getProductsStub.calledWith()).to.be.true;
    expect(result).to.deep.equal(productList);
  });

  it("should throw if getProduct don't find a product", async () => {
    sinon.stub(ProductModel, 'getProduct').resolves();
    try {
      await ProductService.getProduct(1);
    } catch (error) {
      expect(error.isBoom).to.be.true;
      expect(error.output.statusCode).to.equal(404);
      expect(error.output.payload.message).to.equal('Product not found');
    }
  });

  it('should create a product if createProduct is called', async () => {
    const product = { name: 'Produto 1' };
    sinon.stub(ProductValidator, 'validateProduct').resolves();
    sinon.stub(ProductModel, 'createProduct').resolves(1);
    const result = await ProductService.createProduct(product);

    expect(result).to.equal(1);
  });

  it('should update a product if updateProduct is called', async () => {
    const product = { name: 'New Produto 1' };
    sinon.stub(ProductValidator, 'validateProduct').resolves();
    sinon.stub(ProductModel, 'updateProduct').resolves();
    sinon.stub(ProductModel, 'getProduct').resolves(true);
    await ProductService.updateProduct(2, product);

    expect(ProductValidator.validateProduct.calledWith(product)).to.be.true;
    expect(ProductModel.updateProduct.calledWith(2, product)).to.be.true;
  });

  it("should throw if updateProduct don't find a product", async () => {
    const product = { name: 'New Produto 1' };
    sinon.stub(ProductValidator, 'validateProduct').resolves();
    sinon.stub(ProductModel, 'getProduct').resolves();
    sinon.stub(ProductModel, 'updateProduct').resolves();
    try {
      await ProductService.updateProduct(2, product);
    } catch (error) {
      expect(error.isBoom).to.be.true;
      expect(error.output.statusCode).to.equal(404);
      expect(error.output.payload.message).to.equal('Product not found');
    }
  });

  it('should delete a product if deleteProduct is called', async () => {
    sinon.stub(ProductModel, 'deleteProduct').resolves();
    sinon.stub(ProductModel, 'productExists').resolves(true);
    await ProductService.deleteProduct(2);

    expect(ProductModel.deleteProduct.calledWith(2)).to.be.true;
  });

  it("should throw if deleteProduct don't find a product", async () => {
    sinon.stub(ProductModel, 'productExists').resolves(false);
    try {
      await ProductService.deleteProduct(2);
    } catch (error) {
      expect(error.isBoom).to.be.true;
      expect(error.output.statusCode).to.equal(404);
      expect(error.output.payload.message).to.equal('Product not found');
    }
  });

  it('should return a product list if getProductsByName is called', async () => {
    const productList = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];

    const allProductsList = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
      { id: 3, name: 'Produto 3' },
    ];

    const getProductsStub = sinon
      .stub(ProductModel, 'getProducts')
      .resolves(allProductsList);
    const getProductsByNameStub = sinon
      .stub(ProductModel, 'getProductsByName')
      .resolves(productList);
    const resultWithoutName = await ProductService.getProductsByName(undefined);

    expect(getProductsStub.calledOnce).to.be.true;
    expect(getProductsByNameStub.notCalled).to.be.true;
    expect(resultWithoutName).to.deep.equal(allProductsList);

    const resultWithName = await ProductService.getProductsByName('Produto');

    expect(getProductsStub.calledOnce).to.be.true;
    expect(getProductsByNameStub.calledOnce).to.be.true;
    expect(getProductsByNameStub.calledWith('Produto')).to.be.true;
    expect(resultWithName).to.deep.equal(productList);
  });
});
