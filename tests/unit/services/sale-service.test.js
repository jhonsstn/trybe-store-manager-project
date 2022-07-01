const SaleService = require('../../../services/sale-service');
const SaleModel = require('../../../models/sale-model');
const sinon = require('sinon');
const { expect } = require('chai');

describe('SaleService', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should create a sale if calls createSale', async () => {
    sinon.stub(SaleModel, 'createSale').resolves(1);
    const result = await SaleService.createSale();

    expect(result).to.equal(1);
  });
});
