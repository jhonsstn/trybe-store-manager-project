const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const ProductController = require('../../../controllers/product-controller');
const ProductService = require('../../../services/product-service');

const mockRequest = (id, name) => ({
  params: {
    id,
  },
  body: {
    name,
  },
});

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

  it('should return a product if calls getProduct with correct id', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const products = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    const getProductStub = sinon
      .stub(ProductService, 'getProducts')
      .resolves(products);
    await ProductController.getProducts(req, res);

    expect(getProductStub.calledWith()).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(products)).to.be.true;
  });

  it('should create a product if createProduct is called', async () => {
    const req = mockRequest(null, 'Produto 1');
    const res = mockResponse();
    const product = { name: 'Produto 1' };
    const createProductStub = sinon
      .stub(ProductService, 'createProduct')
      .resolves(1);
    await ProductController.createProduct(req, res);

    expect(createProductStub.calledWith(product)).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ id: 1, name: 'Produto 1' })).to.be.true;
  });

  it('should update a product if updateProduct is called', async () => {
    const product = { name: 'Produto 1' };
    const resProduct = { id: 1, name: 'Produto 1' };
    const req = mockRequest(1, 'Produto 1');
    const res = mockResponse();
    const updateProductStub = sinon
      .stub(ProductService, 'updateProduct')
      .resolves(product);
    await ProductController.updateProduct(req, res);

    expect(updateProductStub.calledWith(1, product)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(resProduct)).to.be.true;
  });
});
