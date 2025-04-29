//import Cleaner from "../Model/Cleaner.model";
const Cleaner = require("../Model/Cleaner.model");

const createCleaner = async (req, res) => {
  try {
    const { name, email, phone, profileImage } = req.body;
    //console.log("body:::",req.body);

    // Create new cleaner
    const cleaner = new Cleaner({
      name,
      email,
      phone,

      profileImage,
    });

    // Save cleaner
    await cleaner.save();

    res.status(201).json(cleaner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create cleaner", error: error.message });
  }
};

// Get all cleaners
const getCleaners = async (req, res) => {
  try {
    const cleaners = await Cleaner.find();
    res.status(200).json(cleaners);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve cleaners", error: error.message });
  }
};

// Get a cleaner by ID
const getCleanerById = async (req, res) => {
  try {
    const cleaner = await Cleaner.findById(req.params.id);
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }
    res.status(200).json(cleaner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve cleaner", error: error.message });
  }
};

// Update cleaner details
const updateCleaner = async (req, res) => {
  try {
    const cleaner = await Cleaner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }
    res.status(200).json(cleaner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update cleaner", error: error.message });
  }
};

// Delete a cleaner
const deleteCleaner = async (req, res) => {
  try {
    const cleaner = await Cleaner.findByIdAndDelete(req.params.id);
    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }
    res.status(200).json({ message: "Cleaner deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete cleaner", error: error.message });
  }
};

module.exports = {
  createCleaner,
  getCleaners,
  getCleanerById,
  updateCleaner,
  deleteCleaner,
};
