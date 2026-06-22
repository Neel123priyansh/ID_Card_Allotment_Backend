const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    name:
    {
        type:String,
        required:true
    },

    rollNumber:
    {
        type:String,
        required:true
    },

    busNumber:
    {
        type:String,
        required:true
    },

    epc:
    {
        type:String,
        required:true,
        unique:true,
        uppercase: true,
        trim: true,
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Student",
    studentSchema
);