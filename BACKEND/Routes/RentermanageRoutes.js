const express = require('express');
const router = express.Router();


// Insert Model
const Renter = require("../Model/RenterModel");


// Insert Payment Controller

const OwnerControllers = require('../Controllers/OwnerControllers'); // Adjust the path if necessary




// Use the correct controller function
router.get("/", OwnerControllers.getAllRenter);   // Fix: Call the correct function
router.post("/", OwnerControllers.addRenters); 
router.get("/:id", OwnerControllers.getById); 
router.put("/:id", OwnerControllers.UpdateRenter); 
router.delete("/:id", OwnerControllers.deleteRenter); 


module.exports = router;  



