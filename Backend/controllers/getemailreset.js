const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const sendMail = require("./mail");
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: id });
    return res.json(user);
  } catch (err) {
    console.error("Error:", err);
    return res.json({ msg: "Something went wrong while fetching email" });
  }
};
