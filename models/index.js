const modelNames = require("../constants/modelNames");
const { userCreateCol } = require("./users/users.validator");

module.exports = {
  models: modelNames,
  createModels: (db) => {
    userCreateCol(db);
  },
};
