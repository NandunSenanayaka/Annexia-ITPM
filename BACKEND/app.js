//DB pass = dUNFYHZskXiXqAPf

const express = require("express");
const mongoose = require("mongoose");

const securityRouter = require("./Routes/SecurityRoutes");
const paymentRouter = require("./Routes/PaymentRoutes");

const app = express(); 

//Middleware
app.use(express.json());
app.use("/security", securityRouter);
app.use("/payments", paymentRouter);

  
mongoose.connect("mongodb+srv://admin:dUNFYHZskXiXqAPf@cluster0.jgrs0.mongodb.net/")
.then(()=> console.log("Connected to mongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));