const express = require("express");
const router = express.Router();

//Insert model
const user = require("../Model/SecurityModel");

//Insert Security Controller
const SecurityController = require("../Controllers/SecurityConrollers");

router.get("/",SecurityController.getAllSecurity);

//export
module.exports = router;