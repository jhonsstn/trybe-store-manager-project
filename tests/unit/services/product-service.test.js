const { describe } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const ProductModel = require('../../../models/product-model');
const ProductService = require('../../../services/product-service');
const { Boom } = require('@hapi/boom');
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
    sinon.stub(ProductModel, 'getProduct').resolves(undefined);

    await expect(ProductService.getProduct(1)).to.be.rejectedWith(Error);
  });

  it('should create a product if createProduct is called', async () => {
    const product = { name: 'Produto 1' };
    sinon.stub(ProductModel, 'createProduct').resolves(1);
    const result = await ProductService.createProduct(product);

    expect(result).to.equal(1);
  });
});
