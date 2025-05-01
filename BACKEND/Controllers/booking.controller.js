const Booking = require("../Model/Booking.model");
//const User = require("../models/User");
const Cleaner = require("../Model/Cleaner.model");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const emailUser = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
console.log(emailUser);



// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { service, date, specialInstructions } = req.body;

    // Validate service type
    if (!["cleaning", "laundry", "room service", "other"].includes(service)) {
      return res.status(400).json({ error: "Invalid service type" });
    }

    const booking = new Booking({
      renter: null, //!hardcoded ----gotta change when auth is done
      service,
      date,
      specialInstructions,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("renter", "name email phone")
      .populate("cleaner", "name email phone");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// ?-------------------------------------------------------- Get bookings for current user
/*
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user.id }).populate(
      "cleaner",
      "name email"
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
*/

// Get bookings assigned to cleaner
/*
const getCleanerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ cleaner: req.params.id }).populate(
      "renter",
      "name email phone"
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
*/



// Assign cleaner to booking
const assignCleaner = async (req, res) => {
  try {
    const { cleanerId } = req.body ;

    // Verify cleaner exists
    const cleaner = await Cleaner.findById(cleanerId);
    if (!cleaner) {
      return res.status(400).json({
        success: false,
        error: "Invalid cleaner ID",
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    booking.cleaner = cleanerId;
    booking.status = "Assigned";
    //cleaner.isAvailable = false;

    await booking.save();
    await cleaner.save();
    // *notification sending
    try {
      await sendAssignmentEmail(cleaner, booking);
    } catch (notificationErr) {
      console.error(
        "Failed to send assignment email:",
        notificationErr.message
      );
     
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
     
      .populate("cleaner", "name email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
// ?---------------------------------------------------------Update booking status 
//!gotta modify when auth session is done
/*
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Assigned", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Check authorization
    const isAdmin = req.user.role === "admin";
    const isCleaner =
      booking.cleaner && req.user.id === booking.cleaner.toString();
    const isRenter = req.user.id === booking.renter.toString();

    // Only admin can change to any status
    // Cleaner can mark as completed
    // Renter can cancel if still pending
    if (
      !isAdmin &&
      !(isCleaner && status === "Completed") &&
      !(isRenter && status === "Cancelled" && booking.status === "Pending")
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this booking",
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
*/
// Delete booking
// Function to send email to the cleaner
const sendAssignmentEmail = async (cleaner, booking) => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: pass
      },
    });

    // Format the booking date and time
    const bookingDate = new Date(booking.date).toLocaleDateString();
    const bookingTime = new Date(booking.date).toLocaleTimeString();
    
    // Prepare email content
    const mailOptions = {
      from: "dulassaspam@gmail.com",
      to: cleaner.email,
      subject: "New Cleaning Assignment",
      html: `
        <h2>New Cleaning Assignment</h2>
        <p>Hello ${cleaner.name},</p>
        <p>You have been assigned to a new cleaning job with the following details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Date:</strong> ${bookingDate}</li>
           <li><strong>Time:</strong> ${bookingTime}</li>
          <li><strong>Service Type:</strong> ${booking.service}</li>
          <li><strong>Renter:</strong> Renter 1</li>
          <li><strong>Location:</strong> 123 Main St, Colombo, Sri Lanka</li>
         
          <li><strong>Special Instructions:</strong> ${
            booking.specialInstructions || "None"
          }</li>
        </ul>
        <p>Please log in to your account for more details.</p>
        <p>Thank you for your service!</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  //getCleanerBookings,
  assignCleaner,
  getBookingById,
};