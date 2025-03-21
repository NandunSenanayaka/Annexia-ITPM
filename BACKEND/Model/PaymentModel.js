const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    RenterName:{
        type: String, //data type
        required: true, //validate
    },

    CardName:{
        type: String, //data type
        required: true, //validate
    },

    CardNo:{
        type: Number, //data type
        required: true, //validate
    },

    ExpiryDate:{
        type: String, //data type
        required: true, //validate
    },

    CVV:{
        type: Number, //data type
        required: true, //validate
    },

    Amount:{
        type: Number, //data type
        required: true, //validate
    },

    Remark:{
        type: String, //data type
        required: false, //validate
    }


});   

module.exports = mongoose.model(
    "PaymentModel",
    PaymentSchema
);
