const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("Auth API tests", () => {
  // invalid login
  describe("POST /api/v1/auth/local/login", () => {
    it("Should be a 401 Status Code due to invalid credentials", (done) => {
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.r@gmail.com", password: "Test123" })
        .end((err, response, body) => {
          expect(response).to.have.status(401);
          expect(response.body).to.have.property("messageType", "error");
          return done();
        });
    });
  });

  // valid login
  describe("POST /api/v1/auth/local/login", () => {
    it("Should be a 200 Status Code due to valid credentials", (done) => {
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, response, body) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("messageType", "success");
          expect(response.body).to.have.property("token");
          return done();
        });
    });
  });


  // invalid signup
  describe("POST /api/v1/auth/local/signup", () => {
    it("Should be a 401 Status Code due to user already existing", (done) => {
      chai.request(server)
        .post("/api/v1/auth/local/signup")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009", username: "mahieyin.r" })
        .end((err, response, body) => {
          expect(response).to.have.status(401);
          expect(response.body).to.have.property("messageType", "error");
          expect(response.body).to.have.property("messageBody");
          return done();
        });
    });
  });


  // // valid signup
  // describe("POST /api/v1/auth/local/signup", () => {
  //   it("Should create new user successfully", (done) => {
  //     chai.request(server)
  //       .post("/api/v1/auth/local/signup")
  //       .set("content-type", "application/json")
  //       .send({ email: "brad.trav@gmail.com", password: "Test1234", username: "brad_trav" })
  //       .end((err, response, body) => {
  //         expect(response).to.have.status(200);
  //         expect(response.body).to.have.property("messageType", "success");
  //         expect(response.body).to.have.property("token");
  //         return done();
  //       });
  //   });
  // });

});