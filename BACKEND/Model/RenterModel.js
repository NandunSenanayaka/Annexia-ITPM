const mongoose = require('mongoose');
//my parts
const Schema = mongoose.Schema;

const RenterSchema = new Schema({
    RenterName : {
        type : String,
        required : true
    },
    NicNumber:{
        type: Number,
        required : true
    },
    Age:{
        type: Number,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    ContactNumber:{
        type: Number,
        required : true
    }


})

const Renter = mongoose.model("Renter",RenterSchema);
module.exports = Renter; 