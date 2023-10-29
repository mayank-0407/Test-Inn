const user = require("../models/User");
const csv = require("csvtojson");

const importStudent = async (req, res) => {
  try {
    var pass1=Math.floor(Math.random() * (99999999 - 100000 + 1)) + 100000;
    var userData = [];
    var thisid=req.params.id;
    const id=thisid.toString();
    csv()
      .fromFile(req.file.path)
      .then( async(res) => {
        for (var x = 0; x < res.length; x++) {
            var thispass=res[x].Email;
            thispass+=pass1;
            userData.push({
                name:res[x].Name,
                email:res[x].Email,
                password:thispass,
                isStudent:true,
                quizid:id
            })
        }
        await user.insertMany(userData);
      });
    res.send("Students Added Successfully").status(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  importStudent,
};
