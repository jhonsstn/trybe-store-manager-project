const SaleService = require('../../../services/sale-service');
const SaleController = require('../../../controllers/sale-controller');
const sinon = require('sinon');
const { expect } = require('chai');

const mockRequest = (sale, id) => ({
  body: sale,
  params: {
    id,
  },
});

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.sendStatus = sinon.stub().returns(res);
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

    sinon.stub(SaleService, 'getSales').resolves(sales);
    const req = mockRequest();
    const res = mockResponse();
    await SaleController.getSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sales)).to.be.true;
  });

  it('should get a sale if calls getSale', async () => {
    const sale = {
      id: 1,
      productId: 1,
      quantity: 1,
    };

    const getSaleStub = sinon.stub(SaleService, 'getSale').resolves(sale);
    const req = mockRequest(null, 1);
    const res = mockResponse();
    await SaleController.getSale(req, res);

    expect(getSaleStub.calledWith(1)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sale)).to.be.true;
  });

  it('should delete a sale if calls deleteSale', async () => {
    const deleteSaleStub = sinon.stub(SaleService, 'deleteSale').resolves();
    const req = mockRequest(null, 1);
    const res = mockResponse();
    await SaleController.deleteSale(req, res);

    expect(deleteSaleStub.calledWith(1)).to.be.true;
    expect(res.sendStatus.calledWith(204)).to.be.true;
    expect(res.json.calledOnce).to.be.false;
  });

  it('should update a sale if calls updateSale', async () => {
    const products = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const updateSaleStub = sinon.stub(SaleService, 'updateSale').resolves();
    const req = mockRequest(products, 1);
    const res = mockResponse();
    await SaleController.updateSale(req, res);

    expect(updateSaleStub.calledWith(1, products)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ saleId: 1, itemsUpdated: products })).to.be
      .true;
  });
});
