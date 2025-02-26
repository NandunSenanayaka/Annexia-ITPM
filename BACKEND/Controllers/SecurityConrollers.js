const Security = require ("../Model/SecurityModel");

//Data Display
const getAllSecurity = async (req, res ,next) =>{
    let security;

    try{
        security = await Security.find();
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch security data" });
    }
    //not found
    if(!security){
        return res.status(404).json({message:"No security data found" });
    }

    //Display all security
    return res.status(200).json({security});
};

exports.getAllSecurity = getAllSecurity;


//Data Insert
const addSecurity = async (req ,res , next) =>{
    const{noticeid,title,date,time,status,description} = req.body;

    let security;

    try{
        security = new Security({noticeid,title,date,time,status,description});
        await security
        .save();
    }catch (err){
        console.log(err);
    }

    //not insert security
    if (!security){
        return res.status(404).json({message : "Unable to Add Security Notices"});
    }
    return res.status(200).json({security});
};

//Get by ID
const getById = async (req, res ,next) => {
    const id = req.params.id;

    let security;

    try{
        security = await Security.findById(id);
    }catch(err){
        console.log(err);
    }


//not available security
    if (!security){
        return res.status(404).json({message : "Security Noticed not Found"});
    }
    return res.status(200).json({security});
};



    //update security notice details
const updateSecurity = async (req ,res ,next ) => {
    const id = req.params.id;
    const {noticeid,title,date,time,status,description} = req.body;

    let security;

    try{
        security = await Security.findByIdAndUpdate(id,
            {noticeid,title,date,time,status,description});
            security = await security.save();
    }catch(err) {
        console.log(err);
    }
    
    //if not update security
    if (!security){
        return res.status(404).json({message : "Unable to Update Security Notices"});
    }
    return res.status(200).json({security});
};


//Delete Security Details
const deleteSecurity = async (req ,res , next) =>{
    const id = req.params.id;

    let user;

    try{
        security = await Security.findByIdAndDelete(id);
        }catch (err){
        console.log(err);
    }

    //if not update security
    if (!security){
        return res.status(404).json({message : "Unable to Delete Security Notices"});
    }
    return res.status(200).json({security});
};

exports.getAllSecurity = getAllSecurity;
exports.addSecurity = addSecurity;
exports.getById = getById;
exports.updateSecurity = updateSecurity;
exports.deleteSecurity = deleteSecurity;