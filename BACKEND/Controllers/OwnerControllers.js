const Renter = require("../Model/RenterModel");

//data display 
const getAllRenter = async (req, res, next) => {
    let renters; // Change variable name to avoid confusion

    try {
        renters = await Renter.find(); // Use lowercase 'renter'
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }


      // not found renter
      if(!renters){
        return res.status(404).json({message :"Renter not found"});

    }

    // Return all renter
    return res.status(200).json({ renters });
};

//add renter details (renter)
const addRenters = async (req, res, next) => {
    const { RenterName, NicNumber, Age, Date, Time, description, Address,ContactNumber } = req.body;

    let renter; // Use singular because it's just one renter

    try {
        renter = new Renter({ RenterName, NicNumber, Age, Date, Time, description, Address,ContactNumber });
        await renter.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding renter" });
    }

    // If renter not added
    if (!renter) {
        return res.status(400).json({ message: "Unable to add renter" });
    }

    return res.status(200).json({ renter });
};

//Get by ID
const getById = async (req,res,next)=>{

    const id=req.params.id;

    let renter;

    try{
        renter= await Renter.findById(id);

    }catch(err){
        console.log(err);
    }

    //  not available renter
    if (!renter) {
        return res.status(400).json({ message: "Renter not found" });
    }

    return res.status(200).json({ renter });


}

//update renter

const UpdateRenter = async (req, res, next) => {
    const id = req.params.id;
    const { RenterName, NicNumber, Age, Date, Time, description, Address,ContactNumber } = req.body;

    let renter;

    try {
        renter = await Renter.findByIdAndUpdate(
            id,
            { RenterName, NicNumber, Age, Date, Time, description, Address,ContactNumber },
            { new: true } // This ensures the updated document is returned
        );

        if (!renter) {
            return res.status(404).json({ message: "Renter not found" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating Renter" });
    }

    return res.status(200).json({ renter });
};


//delete Renter
const deleteRenter = async(req,res,next)=>{
    const id= req.params.id;

    let renter;

    try{
        renter = await Renter.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if (!renter) {
        return res.status(400).json({ message: "unable to delete" });
    }

    return res.status(200).json({ renter });
}

// Export properly
module.exports = { getAllRenter ,addRenters,getById,UpdateRenter,deleteRenter};

