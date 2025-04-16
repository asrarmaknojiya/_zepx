const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const session = require("express-session");
const passport = require("passport"); // ✅ Import passport globally



const connection = require("./connection/connection");
const signup = require("./routes/signup/signup");
const contact=require("./routes/contact/contact");
const category=require("./routes/category/category");
const product=require("./routes/products/product");
const cart=require("./routes/cart/cart");
const getoffer=require("./routes/offer/offer")
const banner=require("./routes/banner/banner")
const offer=require("./routes/offer/offer")
const admin=require("./routes/Admin/login/login")
const feedback=require("./routes/feedback/feedback");
const orders=require("./routes/orders/orders");
// const payment=require("./routes/payment/payment");


const googleAuth = require("./routes/googleAuth/googleAuth"); // ✅ Google Auth Routes




const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());


app.use("/", signup);
app.use("/", contact);
app.use("/", category);
app.use("/", product);
app.use("/", cart);
app.use("/",getoffer)
app.use("/",banner)
app.use("/",offer)
app.use("/",admin)
app.use("/",feedback);
app.use("/",orders);
// app.use("/",payment);
app.use("/auth", googleAuth); // ✅ Google Auth Routes
// app.use(
//     session({
//         secret: "your-secret-key",
//         resave: false,
//         saveUninitialized: false,
//     })
// );
app.use(passport.initialize());
app.use(passport.session());



const dotenv = require("dotenv");
// const { default: orders } = require("razorpay/dist/types/orders");
dotenv.config();
const port = process.env.PORT;
const URL=process.env.URL;

connection.connect((error) => {
    if (error) {
        console.log("failed");
    }else{
        console.log("Connected")
    }
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${URL}`);

    })
})
