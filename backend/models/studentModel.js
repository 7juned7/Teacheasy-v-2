const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    studentName: {
        type: String,
        require: true
    },
    class: {
        type: Number,
        require: true
    },
    studentRollno: {
        type: Number,
        require: true
    },
    studentMarks: {
        English: Number,
        Maths: Number,
        Science: Number
    }

})
module.exports = mongoose.model('Student', StudentSchema);
