const SaleService = require('../../../services/sale-service');
const SaleModel = require('../../../models/sale-model');
const sinon = require('sinon');
const { expect } = require('chai');
const SaleValidator = require('../../../middlewares/sale-validator');

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

    sinon.stub(SaleModel, 'createProductSales').resolves();
    sinon.stub(SaleValidator, 'productExists').resolves();
    const createSaleStub = sinon.stub(SaleModel, 'createSale').resolves(1);
    const resultMultiple = await SaleService.createSale(multipleSales);
    expect(resultMultiple).to.equal(1);
    expect(createSaleStub.calledOnce).to.be.true;
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

    sinon.stub(SaleModel, 'getSales').resolves(sales);
    const result = await SaleService.getSales();
    expect(result).to.deep.equal(sales);
  });

  it('should get a sale if calls getSale', async () => {
    const sale = {
      id: 1,
      productId: 1,
      quantity: 1,
    };

    sinon.stub(SaleModel, 'getSale').resolves(sale);
    const result = await SaleService.getSale(1);
    expect(result).to.deep.equal(sale);
  });

  it("should throw an error if getSale don't find a sale", async () => {
    sinon.stub(SaleModel, 'getSale').resolves([]);
    try {
      await SaleService.getSale(1);
    } catch (error) {
      expect(error.isBoom).to.be.true;
      expect(error.output.statusCode).to.equal(404);
      expect(error.output.payload.message).to.equal('Sale not found');
    }
  });

  it('should delete a sale if calls deleteSale', async () => {
    sinon.stub(SaleModel, 'saleExists').resolves(true);
    const deleteSaleStub = sinon.stub(SaleModel, 'deleteSale').resolves();
    await SaleService.deleteSale(1);
    expect(deleteSaleStub.calledOnce).to.be.true;
  });

  it("should throw an error if deleteSale don't find a sale", async () => {
    sinon.stub(SaleModel, 'saleExists').resolves(false);
    sinon.stub(SaleModel, 'deleteSale').resolves();
    try {
      await SaleService.deleteSale(1);
    } catch (error) {
      expect(error.isBoom).to.be.true;
      expect(error.output.statusCode).to.equal(404);
      expect(error.output.payload.message).to.equal('Sale not found');
    }
  });
});
