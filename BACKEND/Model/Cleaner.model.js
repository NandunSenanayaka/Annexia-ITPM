//import mongoose from "mongoose";
const mongoose = require("mongoose");

//  email validation 
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//  phone validation r
const phoneRegex = /^0\d{9}$/;

const cleanerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return phoneRegex.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number. Please use format: +1234567890 or 1234567890`,
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be lower than 0"],
      max: [5, "Rating cannot be higher than 5"],
    },
    profileImage: {
      type: String,
      validate: {
        validator: function (v) {
          // Optional but if provided must be a valid URL or data URI
          return (
            v === undefined || v === "" || /^(https?:\/\/|data:image\/)/.test(v)
          );
        },
        message: (props) =>
          `${props.value} is not a valid image URL or data URI`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index on name and email for better search functionality
cleanerSchema.index({ name: "text", email: "text" });

// Add a custom method to get cleaner's full details
cleanerSchema.methods.getPublicProfile = function () {
  const cleanerObject = this.toObject();
  delete cleanerObject.__v; // Remove version key
  return cleanerObject;
};

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

module.exports = Cleaner;
