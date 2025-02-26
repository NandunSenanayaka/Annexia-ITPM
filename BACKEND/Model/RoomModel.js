const mongoose = require('mongoose');
//my parts
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    RoomName : {
        type : String,
        required : true
    },
    PersonName:{
        type: String,
        required : true
    },
    Description:{
        type: String,
        required : true
    },
    Price:{
        type:Number,
        required:true
    },
    EmailAddress:{
        type:String,
        required:true
    }


})

const Room = mongoose.model("Room",RoomSchema);
module.exports = Room; 