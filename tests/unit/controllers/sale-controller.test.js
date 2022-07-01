const SaleService = require('../../../services/sale-service');
const SaleController = require('../../../controllers/sale-controller');
const sinon = require('sinon');
const { expect } = require('chai');

const mockRequest = (sale) => ({
  body: sale,
});

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('SaleController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a sale if calls createSale with an array of products', async () => {
    const sale = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const req = mockRequest(sale);
    const res = mockResponse();
    const createSaleStub = sinon.stub(SaleService, 'createSale').resolves(1);
    await SaleController.createSale(req, res);

    const expectedResponse = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    expect(createSaleStub.calledWith()).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(expectedResponse)).to.be.true;
  });

  it('should create a sale if calls createSale with only one product', async () => {
    const sale = {
      productId: 1,
      quantity: 1,
    };

    const req = mockRequest(sale);
    const res = mockResponse();
    const createSaleStub = sinon.stub(SaleService, 'createSale').resolves(1);
    await SaleController.createSale(req, res);

    const expectedResponse = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };

    expect(createSaleStub.calledWith()).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(expectedResponse)).to.be.true;
  });
});
