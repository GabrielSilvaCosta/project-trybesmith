import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Deve criar um novo produto com dados válidos', async function () {
    const productData = {
      name: 'Espada Mágica',
      price: '10 peças de ouro',
      orderId: 4,
    };

    const response = await chai
      .request(app)
      .post('/products')
      .send(productData);

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name', 'Espada Mágica');
    expect(response.body).to.have.property('price', '10 peças de ouro');
  });

});
