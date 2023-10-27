var mongoose = require("mongoose");
var quizSchema = mongoose.Schema({
  quizname: {
    type: String,
    required: true,
  },
  quizdescription: {
    type: String,
    required: true,
  },
  upload: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Number,
  },
  owneremail: {
    type: String,
  },
  Questions: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("quiz", quizSchema);
