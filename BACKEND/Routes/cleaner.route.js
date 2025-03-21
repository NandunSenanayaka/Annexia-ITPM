const express = require("express");
const CleanerControllers = require("../Controllers/cleaner.controller");
const router = express.Router();

//! include auth guard middleware

router.post("/", CleanerControllers.createCleaner);

router.get("/", CleanerControllers.getCleaners);

router.get("/:id", CleanerControllers.getCleanerById);

router.put("/:id", CleanerControllers.updateCleaner);

router.delete("/:id", CleanerControllers.deleteCleaner);

module.exports = router;
