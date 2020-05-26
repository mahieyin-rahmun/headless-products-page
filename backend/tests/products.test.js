const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("Products API tests", () => {
  // protected route
  describe("GET /api/v1/products", () => {
    it("Should be a 401 status code since no user tokens were passed", (done) => {
      chai.request(server)
        .get("/api/v1/products")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("messageType", "error");
          expect(res.body).to.have.property("messageBody");
          return done();
        });
    });
  });


  // protected route with login
  describe("GET /api/v1/products", () => {
    it("Should be able to login and retrieve the list of products", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          const { token } = res.body;

          // make request with the token as the header
          chai.request(server)
            .get("/api/v1/products")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("messageType", "success");
              expect(res.body).to.have.property("messageBody");
              expect(res.body.messageBody).to.be.an("array");
              return done();
            });
        });
    });
  });

  // protected route with login
  describe("GET /api/v1/products", () => {
    it("Should not be able to retrieve the list of products due to invalid header", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          const { token } = res.body;

          // make request with the token as the header
          chai.request(server)
            .get("/api/v1/products")
            .set("Authorize", "Bearer " + token)
            .end((err, res) => {
              expect(res).to.have.status(401);
              expect(res.body).to.have.property("messageType", "error");
              expect(res.body).to.have.property("messageBody");
              expect(res.body.messageBody).to.be.an("string");
              return done();
            });
        });
    });
  });


  // protected route with login
  describe("GET /api/v1/products", () => {
    it("Should not be able to retrieve the list of products due to tampered token", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          let { token } = res.body;
          token += "xyz";

          // make request with the token as the header
          chai.request(server)
            .get("/api/v1/products")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
              expect(res).to.have.status(401);
              expect(res.body).to.have.property("messageType", "error");
              expect(res.body).to.have.property("messageBody");
              expect(res.body.messageBody).to.be.an("string");
              return done();
            });
        });
    });
  });
});



describe("Favorite Products API tests", () => {

  describe("GET /api/v1/products/favorite", () => {
    it("Should be able to login and retrieve the list of favorite products", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          const { token } = res.body;

          // make request with the token as the header
          chai.request(server)
            .get("/api/v1/products/favorite")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("messageType", "success");
              expect(res.body).to.have.property("messageBody");
              expect(res.body.messageBody).to.be.an("object");
              expect(res.body.messageBody.productIDs).to.be.an("array");
              return done();
            });
        });
    });
  });


  describe("POST /api/v1/products/favorite", () => {
    it("Should be able to add a productID to the user's favorites list", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          const { token } = res.body;
          const productID = "9cefa024-a9e2-42ce-9935-394b16a264fe";
          // make request with the token as the header
          chai.request(server)
            .post("/api/v1/products/favorite")
            .set("Authorization", "Bearer " + token)
            .set("content-type", "application/json")
            .send({ productID: "9cefa024-a9e2-42ce-9935-394b16a264fe" })
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("messageType", "success");

              // make request with the token as the header
              chai.request(server)
                .get("/api/v1/products/favorite")
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property("messageType", "success");
                  expect(res.body).to.have.property("messageBody");
                  expect(res.body.messageBody).to.be.an("object");
                  expect(res.body.messageBody.productIDs).to.be.an("array");
                  expect(res.body.messageBody.productIDs).to.have.members([productID]);

                  return done();
                });
            });
        });
    });
  });


  describe("POST /api/v1/products/unfavorite", () => {
    it("Should be able to remove a productID from the user's favorites list", (done) => {
      // login with valid credentials
      chai.request(server)
        .post("/api/v1/auth/local/login")
        .set("content-type", "application/json")
        .send({ email: "mahieyin.rahmun@gmail.com", password: "MIIM2009" })
        .end((err, res) => {
          expect(res.body).to.have.property("token");
          const { token } = res.body;
          const productID = "9cefa024-a9e2-42ce-9935-394b16a264fe";
          // make request with the token as the header
          chai.request(server)
            .post("/api/v1/products/unfavorite")
            .set("Authorization", "Bearer " + token)
            .set("content-type", "application/json")
            .send({ productID: "9cefa024-a9e2-42ce-9935-394b16a264fe" })
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("messageType", "success");

              // verify by fetching favorites
              chai.request(server)
                .get("/api/v1/products/favorite")
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property("messageType", "success");
                  expect(res.body).to.have.property("messageBody");
                  expect(res.body.messageBody).to.be.an("object");
                  expect(res.body.messageBody.productIDs).to.be.an("array");
                  expect(res.body.messageBody.productIDs).to.not.have.members([productID]);

                  return done();
                });
            });
        });
    });
  });
});