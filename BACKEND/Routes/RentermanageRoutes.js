const express = require('express');
const router = express.Router();
const OwnerControllers = require('../controllers/OwnerControllers'); // Adjust the path if necessary


// Define routes
router.post('/add', OwnerControllers.createrenter);
router.get('/Allread', OwnerControllers.getAllrenters);
router.get('/read/:id', OwnerControllers.getrenterById);
router.put('/update/:id', OwnerControllers.updaterenter);
router.delete('/delete/:id', OwnerControllers.deleterenter);

module.exports = router;                                                                                            