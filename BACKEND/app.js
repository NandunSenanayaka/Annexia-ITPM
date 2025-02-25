//DB pass = dUNFYHZskXiXqAPf

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/SecurityRoutes");

const app = express(); 

//Middleware
app.use("/security", router);
  
mongoose.connect("mongodb+srv://admin:dUNFYHZskXiXqAPf@cluster0.jgrs0.mongodb.net/")
.then(()=> console.log("Connected to mongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));