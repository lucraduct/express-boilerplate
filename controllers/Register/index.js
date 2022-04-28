/**
 *
 * @author Paravada Naveen Teja <https://www.pnaveenteja.com/>
 * @version 1.0.0
 *
 */

const modelNames = require("../../constants/modelNames");
const { getDb } = require("../../utils/mongoConnect");

let Register = {};

Register.createUser = async (req, res) => {
  try {
    const db = getDb();
    const userDetails = db.collection(modelNames.users).create({
      email: req.body.email,
      pasword: req.body.password,
    });
    res.send(userDetails);
  } catch (error) {
    console.error(error);
  }
};

module.exports = Register;
