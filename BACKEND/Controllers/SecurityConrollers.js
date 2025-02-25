const Security = require ("../Model/SecurityModel");

//Data Display
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

exports.getAllSecurity= this.getAllSecurity;
exports.addSecurity = addSecurity;