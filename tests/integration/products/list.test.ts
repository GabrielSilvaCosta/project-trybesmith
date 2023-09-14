import sinon from "sinon";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/app";

chai.use(chaiHttp);

describe("GET /products", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Deve retornar os produtos através do endpoint /products", async function () {
    const response = await chai.request(app).get("/products");

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
  });

  
});
