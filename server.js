const package = require("./package.json");
const logger = require("./logger");
const app = require("./index");
//Server listeners
app.listen(process.env.PORT, () =>
  logger.http(`${package.name} is running in PORT=${process.env.PORT}`)
);
