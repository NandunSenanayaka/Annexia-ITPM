const express = require('express');
const router = express.Router();
const RoomControllers = require('../Controllers/RoomControllers'); // Adjust the path if necessary


// Define routes
router.post('/add', RoomControllers.createroom);
router.get('/Allread', RoomControllers.getAllrooms);
router.get('/read/:id', RoomControllers.getroomById);
router.put('/update/:id', RoomControllers.updateroom);
router.delete('/delete/:id', RoomControllers.deleteroom);

module.exports = router;                                                                                            