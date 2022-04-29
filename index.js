require("dotenv").config();
const express = require("express");
const app = express();
const mongo = require("./utils/mongoConnect");
const routes = require("./routes");
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
app.get("/status", (_, res) => res.send("ok"));

app.use("/api/v1/", routes);

module.exports = app;
