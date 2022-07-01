const SaleService = require('../../../services/sale-service');
const SaleModel = require('../../../models/sale-model');
const sinon = require('sinon');
const { expect } = require('chai');

describe('SaleService', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should create a sale if calls createSale', async () => {
    const multipleSales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const uniqueSale = {
      productId: 2,
      quantity: 5,
    };

    const createSaleStub = sinon.stub(SaleModel, 'createSale').resolves(1);
    const resultMultiple = await SaleService.createSale(multipleSales);
    expect(resultMultiple).to.equal(1);
    expect(createSaleStub.calledOnce).to.be.true;
    const uniqueResult = await SaleService.createSale(uniqueSale);
    expect(createSaleStub.calledTwice).to.be.true;
    expect(uniqueResult).to.equal(1);
  });
});
