const express = require('express');
const router = express.Router();


// Insert Model
const Renter = require("../Model/RoomModel");


const RoomControllers = require('../Controllers/RoomControllers'); // Adjust the path if necessary


// Use the correct controller function
router.get("/", RoomControllers.getAllRoom);   // Fix: Call the correct function
router.post("/", RoomControllers.addRooms); 
router.get("/:id", RoomControllers.getById); 
router.put("/:id", RoomControllers.UpdateRoom); 
router.delete("/:id", RoomControllers.deleteRoom); 

module.exports = router;                                                                                            