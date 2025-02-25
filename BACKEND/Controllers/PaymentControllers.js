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

//data insert (payment)
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

    // If payment wasn't added
    if (!payment) {
        return res.status(400).json({ message: "Unable to add payment" });
    }

    return res.status(200).json({ payment });
};


// Export properly
module.exports = { getAllPayment ,addPayments};

