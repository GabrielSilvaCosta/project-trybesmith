import sinon from "sinon";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/app"; 
import UserModel from "../../../src/database/models/user.model";

chai.use(chaiHttp);

describe("POST /login", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Deve retornar um erro ao fazer login com informações inválidas", async function () {
    const username = "example";
    const password = "password";

    sinon.stub(UserModel, "findOne").resolves(null);

    const response = await chai
      .request(app)
      .post("/login")
      .send({ username, password });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property(
      "message",
      "Username or password invalid"
    );
  });

  it("Deve retornar um erro ao fazer login com campos em branco", async function () {
    const response = await chai.request(app).post("/login").send({});

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property(
      "message",
      '"username" and "password" are required'
    );
  });
});
