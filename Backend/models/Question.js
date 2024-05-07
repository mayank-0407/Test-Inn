var mongoose = require('mongoose')
var questionSchema = mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText:{
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options:{
        type  :Array,
        default:[]
    },
    ismcq: {
        type: Boolean,
        // required: true
    }
})

questionSchema.index({ quizid: 1 });

questionSchema.index({ questionText: 'text' });

module.exports = mongoose.model('question',questionSchema)

