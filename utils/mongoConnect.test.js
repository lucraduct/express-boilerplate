require("dotenv").config();
// const { getDb } = require("./mongoConnect");
const mongo = require("./mongoConnect");

describe("Establish Connection to Mongodb", () => {
  test("should Connect to Mongodb", (done) => {
    // expect.assertions(1);
    const db = mongo.init((error) => console.error("error", error));
    // const db = getDb();
    expect(typeof db).toBe("object");
    done();
  });
});
