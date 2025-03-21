const express = require("express");
const router = express.Router();
const BookingControllers = require("../Controllers/booking.controller");


router.post("/", BookingControllers.createBooking);
router.get("/", BookingControllers.getAllBookings);


/*
router.get("/:id", protect, getBooking);
router.put("/:id/status", protect, updateBookingStatus);
*/

router.put("/:id/assign", BookingControllers.assignCleaner);
//router.delete("/:id", deleteBooking);

module.exports = router;
