var mongoose = require("mongoose");
var quizSchema = mongoose.Schema({
  quizname: {
    type: String,
    required: true,
  },
  quizdescription: {
    type: String,
    // required: true,
  },
  upload: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String,
  },
  owneremail: {
    type: String,
  },
  Questions: {
    type: Array,
    default: [],
  },
});

quizSchema.index({ quizname: 1 });

module.exports = mongoose.model("quiz", quizSchema);
