//DB pass = dUNFYHZskXiXqAPf

const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const port = process.env.PORT || 3001;

const securityRouter = require("./Routes/SecurityRoutes");
const paymentRouter = require("./Routes/PaymentRoutes");
const cleanerRouter = require("./Routes/cleaner.route");
const bookingRouter = require("./Routes/booking.route");

const app = express(); 
const cors = require("cors");
//Middleware
app.use(cors());
app.use(express.json());
app.use("/security", securityRouter);
app.use("/payments", paymentRouter);
app.use("/cleaner", cleanerRouter);
app.use("/booking", bookingRouter);


  
mongoose.connect("mongodb+srv://admin:dUNFYHZskXiXqAPf@cluster0.jgrs0.mongodb.net/")
.then(()=> console.log("Connected to mongoDB"))
.then(()=> {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }
    );
})
.catch((err)=> console.log((err)));

//register
require("./Model/Register");
const formData = mongoose.model("Register");
app.post("/register",async(req,res) => {
    const {name,email,nic,dateTime,password,description,role} =req.body;
    try{
        await formData.create({
            name,
            email,
            nic,
            dateTime,
            password,
            description,
            role // Ensure role is saved in the database


        })
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"err"});
    }    
});

//login
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await formData.findOne({ email });
        
//         if (!user) {
//             return res.json({ err: "User Not Found" });
//         }

//         if (user.password === password) {
//             return res.json({ status: "ok" });
//         } else {
//             return res.json({ err: "Incorrect Password" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: "Server Error" });
//     }
// });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await formData.findOne({ email });
        
        if (!user) {
            return res.json({ err: "User Not Found" });
        }

        if (user.password === password) {
            return res.json({ status: "ok", role: user.role });  // Include role here
        } else {
            return res.json({ err: "Incorrect Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server Error" });
    }
});


 


