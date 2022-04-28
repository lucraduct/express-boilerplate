/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const express = require("express");
const router = express.Router();

const Register = require("./Register");

router.all("/auth", Register);

module.exports = router;
