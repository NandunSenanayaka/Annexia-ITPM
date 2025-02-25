const express = require("express");
const router = express.Router();

//Insert model
const security = require("../Model/SecurityModel");

//Insert Security Controller
const SecurityController = require("../Controllers/SecurityConrollers");

router.get("/",SecurityController.getAllSecurity);
router.post("/",SecurityController.addSecurity);
router.get("/:id",SecurityController.getById);
router.put("/:id",SecurityController.updateSecurity);
router.delete("/:id", SecurityController.deleteSecurity);

//export
module.exports = router;