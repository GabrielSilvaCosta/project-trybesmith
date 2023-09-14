import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';
import OrderService from '../../../src/services/order.service';

chai.use(chaiHttp);

describe('GET /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('É possível listar todos os pedidos com seus produtos', async function () {
    sinon.stub(OrderModel, 'findAll').resolves([]);
    sinon.stub(ProductModel, 'findAll').resolves([]);

    const response = await chai.request(app).get('/orders');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([]);
  });

  it('Deve retornar uma lista vazia de pedidos com produtos quando não há pedidos cadastrados', async function () {
    sinon.stub(OrderModel, 'findAll').resolves([]); 
    sinon.stub(ProductModel, 'findAll').resolves([]); 

    const response = await chai.request(app).get('/orders');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.is.empty;
  });


  it('Deve retornar um erro ao fazer login com nome de usuário inexistente', async function () {
    const username = 'nonexistentuser';
    const password = 'password';
    //

    
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .post('/login')
      .send({ username, password });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property(
      'message',
      'Username or password invalid'
    );
  });


  it('Deve retornar um erro se a busca por pedidos falhar', async function () {
    
    sinon.stub(OrderModel, 'findAll').rejects(new Error('Erro ao buscar pedidos'));
  
    try {
      await OrderService.allOrdersWithProducts();
      
      expect.fail('Esperava-se que uma exceção fosse lançada.');
    } catch (error: any) { 
      expect(error.message).to.equal('Erro ao buscar pedidos');
    }
  });
  

  it('Deve retornar um erro se a busca por produtos falhar', async function () {
    const ordersInDatabase = [
      {
        id: 1,
        userId: 1,
        productIds: [{ id: 101 }, { id: 102 }],
      },
    ];
  
    const orderInstances = ordersInDatabase.map((orderData) => OrderModel.build(orderData));
  
    sinon.stub(OrderModel, 'findAll').resolves(orderInstances);
    sinon.stub(ProductModel, 'findAll').rejects(new Error('Erro ao buscar produtos'));
  
    try {
      await OrderService.allOrdersWithProducts();
    } catch (error: any) {
      expect(error.message).to.equal('Erro ao buscar produtos');
    }
  });
  

  
  


});
