require("dotenv").config();
const express = require("express");
const app = express();
const mongo = require("./utils/mongoConnect");
const package = require("./package.json");
const routes = require("./routes");
const logger = require("./logger");
const { successHandler, errorHandler } = require("./logger/morgan");

if (process.env.NODE_ENV !== "test") {
  app.use(successHandler);
  app.use(errorHandler);
}

//Connection of Database
mongo.init(function (error) {
  if (error) throw error;
});

//Routers
app.use("/api/v1/", routes);

//Server listeners
app.listen(process.env.PORT, () =>
  logger.http(`${package.name} is running in PORT=${process.env.PORT}`)
);
