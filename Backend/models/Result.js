var mongoose = require('mongoose')
var resultSchema = mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    studentid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    marks:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('result',resultSchema)

