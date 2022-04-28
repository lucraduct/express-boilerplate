/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const express = require("express");
const router = express.Router();
const Register = require("../../controllers/Register");

router.post("/register", Register.createUser);

module.exports = router;
