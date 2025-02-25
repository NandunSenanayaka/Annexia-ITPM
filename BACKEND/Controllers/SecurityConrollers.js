const Security = require ("../Model/SecurityModel");
const getAllSecurity = async (req, res ,next) =>{
    let security;

    try{
        security = await Security.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!security){
        return res.status(404).json({message:"Security"});
    }

    //Display all security
    return res.status(200).json({security});
};

exports.getAllSecurity = getAllSecurity;