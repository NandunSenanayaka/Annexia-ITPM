const Payment = require("../Model/PaymentModel");

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

// Export properly
module.exports = { getAllPayment };
