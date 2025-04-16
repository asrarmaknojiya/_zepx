



const connection = require("../../connection/connection");
require("dotenv").config();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: "rzp_test_t5QTURwhUmX9Dk",
    key_secret: "v3DCTFI7o9BCd48NW2cYcXgP",
});


const payment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required!" });
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount < 1) {
            return res.status(400).json({ error: "Invalid amount! Must be at least ₹1." });
        }

        // 🔹 Create order on Razorpay
        const options = {
            amount: numericAmount * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        console.log("✅ Order Created:", order);

        res.json({ order });

    } catch (error) {
        console.error("❌ Razorpay API Error:", error);
        res.status(500).json({ error: "Order Creation Failed" });
    }
};


module.exports = { payment };
