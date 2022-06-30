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
});
