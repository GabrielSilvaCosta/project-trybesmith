import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('É possível listar todos os pedidos com seus produtos', async function () {
    sinon.stub(OrderModel, 'findAll').resolves([]);
    const response = await chai.request(app).get('/orders');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([]);
  });

  // it('Deve retornar um erro interno do servidor ao listar pedidos com produtos', async function () {
  //   // Simule o OrderModel.findAll para lançar um erro
  //   sinon.stub(OrderModel, 'findAll').throws(new Error('Erro ao listar pedidos com produtos'));

  //   const response = await chai.request(app).get('/orders');

  //   expect(response.status).to.be.equal(500);
  //   expect(response.body.message).to.equal('Erro ao listar os pedidos com produtos.');
  // });
});
