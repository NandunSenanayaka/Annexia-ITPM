const express = require("express");
const router = express.Router();

// Insert Model
const Payment = require("../Model/PaymentModel");

// Insert Payment Controller
const PaymentControllers = require("../Controllers/PaymentControllers");

// Use the correct controller function
router.get("/", PaymentControllers.getAllPayment);   // Fix: Call the correct function
router.post("/", PaymentControllers.addPayments); 
router.get("/:id", PaymentControllers.getById); 

// Export the router
module.exports = router;
