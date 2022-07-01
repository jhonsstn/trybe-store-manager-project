const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../models/connection');
const SaleModel = require('../../../models/sale-model');

describe('SaleModel', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a sale if calls createSale', async () => {
    sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
    const result = await SaleModel.createSale();

    expect(result).to.equal(1);
  });
});
