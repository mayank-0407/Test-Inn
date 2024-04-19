const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const sendMail = require("./mail");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user.gaveQuiz) {
      return res.status(200).json({
        message:true
      });
    } else {
      return res.status(200).json({
        message:false
      });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(203).json({ msg: "Something went wrong" });
  }
};
