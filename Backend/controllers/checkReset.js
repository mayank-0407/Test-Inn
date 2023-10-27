const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const sendMail = require("./mail");
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({ msg: "User does not exist with this email!!" });
    }
    console.log(req.body.password);
    console.log(req.body.email);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updateUser = await User.updateOne(
      { email: req.body.email },
      { password: hashedPassword }
    );

    if (updateUser) {
      return res.json({ message: "Password updated!!" });
    } else {
      return res.json({ msg: "Something went wrong" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.json({ msg: "Something went wrong" });
  }
};
// module.exports = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             return res.json({ msg: 'User does not exist with this email!!' });
//         }

//         const otps = await Otp.findOne({ email: req.body.email });

//         if (!otps) {
//             return res.json({ msg: "Something went wrong" });
//         }

//         const otp = otps.otp;

//         if (otp != req.body.otp) {
//             return res.json({ msg: "Invalid Otp!!!" });
//         }

//         const hashedPassword = await User.hashPassword(req.body.p1);

//         const updateUser = await User.updateOne({ email: req.body.email }, { password: hashedPassword });

//         if (updateUser) {
//             return res.json({ message: "Password updated!!" });
//         } else {
//             return res.json({ msg: "Something went wrong" });
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         return res.json({ msg: "Something went wrong" });
//     }
// }
