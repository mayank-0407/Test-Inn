const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  // check if email exists in DB!
  var dbUser = await User.findOne({ studentid: username }).exec();
  var dbUser1 = await User.findOne({ email: username }).exec();
  if(dbUser1){
    dbUser=dbUser1;
  }

  if (dbUser && dbUser.isStudent) {
    const match = await bcrypt.compare(password, dbUser.password);
    const email = dbUser.email;
    const quizid = dbUser.quizid;
    const studentid = dbUser.studentid;
    console.log(email);
    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email ,quizid,studentid},
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
      res.status(203).json({ message: "Username or Password incorrect" });
    }
  } else {
    res.status(203).json({ message: "Username is Not registered or this is student account" });
  }
};
