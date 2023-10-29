const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  // check if email exists in DB!
  const dbUser = await User.findOne({ studentid: username }).exec();
  if (dbUser && dbUser.isStudent) {
    const match = await bcrypt.compare(password, dbUser.password);
    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email:dbUser.email },
        process.env.JWT_LOGIN_TOKEN,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
    }
  } else {
    res.status(400).json({ message: "Username is Not registered or this is student account" });
  }
};
