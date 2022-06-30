const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../models/connection');
const ProductModel = require('../../../models/product-model');

describe('ProductModel', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a product if calls getProduct with correct id', async () => {
    sinon.stub(db, 'query').resolves([[{ id: 1, name: 'Produto 1' }]]);
    const result = await ProductModel.getProduct(1);
    expect(result.id).to.equal(1);
  });

  it('should return a product list if getProducts is called', async () => {
    const products = [
      [
        { id: 1, name: 'Produto 1' },
        { id: 2, name: 'Produto 2' },
      ],
    ];
    const productList = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    sinon.stub(db, 'query').resolves(products);
    const result = await ProductModel.getProducts();
    expect(result).to.deep.equal(productList);
  });

  it('should create a product if createProduct is called', async () => {
    const product = { name: 'Produto 1' };
    sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
    const result = await ProductModel.createProduct(product);

    expect(result).to.equal(1);
  });
});
