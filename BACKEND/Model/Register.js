const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      nic: {
        type: String,
        required: true,
      },
      dateTime: {
        type: Date,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },


});   

module.exports = mongoose.model(
    "Register",
    RegisterSchema
);
