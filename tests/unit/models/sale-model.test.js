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

  it('should create a product sale if calls createProductSales', async () => {
    const queryStub = sinon.stub(db, 'query').resolves();
    await SaleModel.createProductSales(1, {
      productId: 1,
      quantity: 1,
    });

    expect(queryStub.calledOnce).to.be.true;
  });

  it('should get all sales if calls getSales', async () => {
    const sales = [
      {
        id: 1,
        productId: 1,
        quantity: 1,
      },
      {
        id: 2,
        productId: 2,
        quantity: 5,
      },
    ];

    sinon.stub(db, 'query').resolves([sales]);
    const result = await SaleModel.getSales();

    expect(result).to.deep.equal(sales);
  });

  it('should get a sale if calls getSale', async () => {
    const sale = {
      id: 1,
      productId: 1,
      quantity: 1,
    };

    sinon.stub(db, 'query').resolves([sale]);
    const result = await SaleModel.getSale(1);

    expect(result).to.deep.equal(sale);
  });

  it('should delete a sale if calls deleteSale', async () => {
    const queryStub = sinon.stub(db, 'query').resolves();
    await SaleModel.deleteSale(1);

    expect(queryStub.calledOnce).to.be.true;
  });
});
