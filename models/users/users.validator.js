const modelNames = require("../../constants/modelNames");
const logger = require("../../logger");

/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */
const userModelValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email"],
      properties: {
        email: {
          bsonType: "string",
          description: "must be a string",
        },
        password: {
          bsonType: "string",
          description: "must be a string",
        },
      },
    },
  },
};

const userCreateCol = (db) => {
  db.createCollection(modelNames.users, userModelValidator, (err) => {
    if (err) {
      if (err.code === 48) {
        logger.info("User Collection Already Exists");
      } else logger.error(err);
    } else {
      logger.info("User Collection Createed Successfully");
    }
  });
  db.collection(modelNames.users).createIndex({ email: 1 }, { unique: true });
};

module.exports = { userModelValidator, userCreateCol };
