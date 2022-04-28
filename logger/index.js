/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const winston = require("winston");
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      level: "error",
      filename: "error.log",
      dirname: "./logs",
    }),
    new winston.transports.File({
      level: "info",
      filename: "info.log",
      dirname: "./logs",
    }),
    new winston.transports.File({
      level: "warn",
      filename: "warns.log",
      dirname: "./logs",
    }),
  ],
});

module.exports = logger;
