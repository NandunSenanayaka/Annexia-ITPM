//DB pass = dUNFYHZskXiXqAPf

const express = require("express");
const mongoose = require("mongoose");

const env = require("dotenv");
env.config();
const port = process.env.PORT || 5000;

// const securityRouter = require("./Routes/SecurityRoutes");
// const paymentRouter = require("./Routes/PaymentRoutes");
const cleanerRouter = require("./Routes/cleaner.route");
const bookingRouter = require("./Routes/booking.route");

const nodemailer = require("nodemailer");

const securityRouter = require("./Routes/SecurityRoutes");
const paymentRouter = require("./Routes/PaymentRoutes");
const RentermangeRouter = require("./Routes/RentermanageRoutes");
const RoomRouter = require("./Routes/RoomRoutes");


const app = express(); 
const cors = require("cors");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lruchira58@gmail.com",
    pass: "ajty wjvb ewjh umng",
  },
});

//Middleware
app.use(cors());
app.use(express.json());
app.use("/security", securityRouter);
app.use("/payments", paymentRouter);

app.use("/cleaner", cleanerRouter);
app.use("/booking", bookingRouter);



app.use("/renter", RentermangeRouter);
app.use("/room", RoomRouter);

  
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
            return res.json({ status: "ok", role: user.role });  // Include role
        } else {
            return res.json({ err: "Incorrect Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server Error" });
    }
});

// Welcome email 
app.post("/send-welcome-email", async (req, res) => {
  const { name, email, username, password } = req.body;

  const mailOptions = {
    from: "lruchira58@gmail.com",
    to: email,
    subject: "Welcome to ANNEXIA - Your Registration Details",
    text: `Dear ${name},

Thank you for joining ANNEXIA! We're thrilled to have you as part of our community.

Here are your login credentials:
Username: ${username}
Password: ${password}

For security reasons, we recommend changing your password after your first login.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The ANNEXIA Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res.status(500).json({ message: "Failed to send welcome email" });
  }
});


 


