// const mongoose= require("mongoose");
// const Schema = mongoose.Schema;

// const RegisterSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//       },
//       nic: {
//         type: String,
//         required: true,
//       },
//       dateTime: {
//         type: Date,
//         required: true,
//       },
//       password: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },


// });   

// module.exports = mongoose.model(
//     "Register",
//     RegisterSchema
// );

const mongoose = require("mongoose");
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
  role: {
    type: String,
    required: true, // Ensure that role is a required field
    enum: ["renter", "owner", "security", "cleaner manager"], // Ensure role can only be one of these values
  },
});

module.exports = mongoose.model("Register", RegisterSchema);
