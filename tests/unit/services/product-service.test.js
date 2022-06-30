const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/product-model');
const ProductService = require('../../../services/product-service');

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
    sinon.stub(ProductModel, 'getProducts').resolves(productList);
    const result = await ProductModel.getProducts();
    expect(result).to.deep.equal(productList);
  });
});
