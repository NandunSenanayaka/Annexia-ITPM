//DB pass = dUNFYHZskXiXqAPf

const express = require("express");
const mongoose = require("mongoose");

const securityRouter = require("./Routes/SecurityRoutes");
const paymentRouter = require("./Routes/PaymentRoutes");

const app = express(); 
const cors = require("cors");
//Middleware
app.use(cors());
app.use(express.json());
app.use("/security", securityRouter);
app.use("/payments", paymentRouter);

  
mongoose.connect("mongodb+srv://admin:dUNFYHZskXiXqAPf@cluster0.jgrs0.mongodb.net/")
.then(()=> console.log("Connected to mongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));

//register
require("./Model/Register");
const formData = mongoose.model("Register");
app.post("/register",async(req,res) => {
    const {name,email,nic,dateTime,password,description} =req.body;
    try{
        await formData.create({
            name,
            email,
            nic,
            dateTime,
            password,
            description


        })
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"err"});
    }    
}) 