const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    noticeid:{
        type:Number, //data type
        required:true, // validation
    },
    title:{
        type:String, //data type
        required:true, // validation
    },
    date:{
        type:String, //data type
        required:true, // validation
    },
    time:{
        type:String, //data type
        required:true, // validation
    },
    status:{
        type:String, //data type
        required:true, // validation
    },
    description:{
        type:String, //data type
        required:true, // validation
    }
});

module.exports = mongoose.model(
    "SecurityModel", //file name
    userSchema //function name
)