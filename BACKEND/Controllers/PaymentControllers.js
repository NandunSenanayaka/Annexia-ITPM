const Payment = require("../Model/PaymentModel");


//data display 
const getAllPayment = async (req, res, next) => {
    let payments; // Change variable name to avoid confusion

    try {
        payments = await Payment.find(); // Use lowercase 'payments'
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }


      // not found payment
      if(!payments){
        return res.status(404).json({message :"Payment not found"});

    }

    // Return all payments
    return res.status(200).json({ payments });
};

//add payment details (payment)
const addPayments = async (req, res, next) => {
    const { RenterName, CardName, CardNo, ExpiryDate, CVV, Amount, Remark } = req.body;

    let payment; // Use singular because it's just one payment

    try {
        payment = new Payment({ RenterName, CardName, CardNo, ExpiryDate, CVV, Amount, Remark });
        await payment.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding payment" });
    }

    // If payment not added
    if (!payment) {
        return res.status(400).json({ message: "Unable to add payment" });
    }

    return res.status(200).json({ payment });
};

//Get by ID
const getById = async (req,res,next)=>{

    const id=req.params.id;

    let payment;

    try{
        payment= await Payment.findById(id);

    }catch(err){
        console.log(err);
    }

    //  not available payment
    if (!payment) {
        return res.status(400).json({ message: "payment not found" });
    }

    return res.status(200).json({ payment });


}

//update payment

const UpdatePayment = async (req, res, next) => {
    const id = req.params.id;
    const { RenterName, CardName, CardNo, ExpiryDate, CVV, Amount, Remark } = req.body;

    let payment;

    try {
        payment = await Payment.findByIdAndUpdate(
            id,
            { RenterName, CardName, CardNo, ExpiryDate, CVV, Amount, Remark },
            { new: true } // This ensures the updated document is returned
        );

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating payment" });
    }

    return res.status(200).json({ payment });
};


//delete payment
const deletePayment = async(req,res,next)=>{
    const id= req.params.id;

    let payment;

    try{
        payment = await Payment.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if (!payment) {
        return res.status(400).json({ message: "unable to delete" });
    }

    return res.status(200).json({ payment });
}

// Export properly
module.exports = { getAllPayment ,addPayments,getById,UpdatePayment,deletePayment};

