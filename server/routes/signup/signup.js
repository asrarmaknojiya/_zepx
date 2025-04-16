const express = require("express");
const router = express.Router();
const signup = require("../../controller/signup/signup");
const location = require("../../middleWare/fileHandler");

// Existing Routes
router.get("/users", signup.getUser);
router.post("/addusers", signup.addUser);
router.post("/checkusers", signup.login);
router.get("/getuserbyid/:id", signup.getuserbyid);
router.put("/userstatus/:id", signup.userstatus);
router.put("/updatedata/:id", location.single("img"), signup.updatedata);
router.delete("/deleteuser/:id", signup.deleteuser);

// OTP for Password Reset
router.post("/sendotp", signup.sendPasswordResetOTP);   // OTP bhejne ka route
router.post("/verifyotp", signup.verifyOTP); // OTP verify karke password reset ka route
router.post("/verifyotpcheck", signup.verifyOTPCheck); // OTP verify karke password reset ka route

// 
// router.post("/send-otp", signup.signupOTP);


module.exports = router;
