//import mongoose from "mongoose";
const mongoose = require("mongoose");
const cleanerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    profileImage: { type: String },
  },
  {
    timestamps: true,
  }
);

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

module.exports = Cleaner;
