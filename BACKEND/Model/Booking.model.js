const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  renter: {
    type: String,
   
  },
  service: {
    type: String,
    enum: ["cleaning", "laundry", "room service", "other"],
    required: true,
  },
  cleaner: {
    type: Schema.Types.ObjectId,
    ref: "Cleaner",
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  
  
  specialInstructions: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Pending", "Assigned", "Completed", "Cancelled"],
    default: "Pending",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
BookingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
