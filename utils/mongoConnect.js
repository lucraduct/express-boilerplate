/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

var mongodb = require("mongodb");
var client = mongodb.MongoClient;
const logger = require("../logger");
const { createModels } = require("../models");
const { MONGO_DB_DIALECT, MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME } =
  process.env;
const uri = `${MONGO_DB_DIALECT}://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
var _db;

//Initialze DB Here
module.exports = {
  init: function (callback) {
    client.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      async function (err, client) {
        if (err) {
          logger.error(err);
          return callback(err);
        } else {
          _db = client.db("lucraduct-boilerplate");
          await _db.command({ ping: 1 });
          logger.info("MongoDb Connected Successfully");
          logger.info(uri);
          logger.info("Checking for Databases");
          createModels(_db);
          return _db;
        }
      }
    );
  },
  getDb: function () {
    return _db;
  },
};
