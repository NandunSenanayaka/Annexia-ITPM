const express = require("express");
const router = express.Router();
const BookingControllers = require("../Controllers/booking.controller");


router.post("/", BookingControllers.createBooking);
router.get("/", BookingControllers.getAllBookings);


/*
router.get("/:id", protect, getBooking);
router.put("/:id/status", updateBookingStatus);
*/
router.get("/:id", BookingControllers.getBookingById);

router.put("/:id/assign", BookingControllers.assignCleaner);
//router.delete("/:id", deleteBooking);

module.exports = router;
