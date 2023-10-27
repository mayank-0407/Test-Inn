const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require('../models/Otp');
const sendMail = require('./mail');
const User = require("../models/User");

// Wrap your asynchronous database operations in a function that returns a Promise
const getEmail = (email) => {
  return new Promise((resolve, reject) => {
    Otp.find({ email: email })
      .then((otps) => {
        if (otps.length !== 0) {
          console.log("yes in delete");
          return Otp.deleteOne({ email: email });
        }
        resolve();
      })
      .catch((err) => {
        console.log("err in finding email: ", err);
        reject(err);
      });
  });
};

module.exports = async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });

    if (users.length === 0) {
      console.log("user does not exist with this email at forgot password");
      return res.json({ msg: "user does not exist with this email" });
    } else {
      var email = req.body.email;
      await getEmail(req.body.email);

      setTimeout(async function () {
        console.log("timeout (2min)");
        await getEmail(email);
      }, 2 * 60000);
      const thisuser = await User.find({ email: req.body.email });
      console.log(thisuser._id);
      const url = `https://127.0.0.1:4001/reset/${thisuser._id}`;
      var otp = new Otp({
        otp: uRl,
        email: req.body.email
      });
      console.log("otp =", otp);

      await otp.save();
      sendMail(otp.email, otp.otp);
      return res.status(201).json({ message: "all ok otp has been sent" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.json({ msg: "some error!" });
  }
};
