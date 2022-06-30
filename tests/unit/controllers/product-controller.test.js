const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const ProductController = require('../../../controllers/product-controller');
const ProductService = require('../../../services/product-service');

const mockRequest = (id) => {
  return {
    params: {
      id,
    },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('ProductController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a product if calls getProduct with correct id', async () => {
    const req = mockRequest(1);
    const res = mockResponse();
    const getProductStub = sinon
      .stub(ProductService, 'getProduct')
      .resolves({ id: 1, name: 'Produto 1' });
    await ProductController.getProduct(req, res);

    expect(getProductStub.calledWith(1)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ id: 1, name: 'Produto 1' })).to.be.true;
  });
});
