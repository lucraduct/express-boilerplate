/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const jwt = require("jsonwebtoken");
const logger = require("../../logger");

function generateJWTToken(data) {
  try {
    return jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  } catch (error) {
    return logger.error("jwtEncrypt : JWT Token cannot be created.", err);
  }
}

function verifyJWTToken(token) {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return logger.error("jwtVerify : JWT token cannot be verifies", err);
  }
}

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
