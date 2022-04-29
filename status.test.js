const request = require("supertest");
const app = require("./index");

describe("Test the root path", () => {
  test("Status OK", (done) => {
    request(app)
      .get("/status")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
