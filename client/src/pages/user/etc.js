
// import React, { useState } from "react";
// import axios from "axios";

// const OtpSender = () => {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   const sendOtp = async () => {
//     if (!mobile) {
//       setMessage("Please enter a mobile number");
//       return;
//     }

//     const generatedOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//     setOtp(generatedOtp);

//     try {
//       const response = await axios.post("http://localhost:5000/send-otp", {
//         mobile,
//         otp: generatedOtp,
//       });

//       if (response.data.success) {
//         setMessage("OTP sent successfully!");
//       } else {
//         setMessage("Failed to send OTP");
//       }
//     } catch (error) {
//       setMessage("Error sending OTP");
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>Send OTP</h2>
//       <input
//         type="text"
//         placeholder="Enter Mobile Number"
//         value={mobile}
//         onChange={(e) => setMobile(e.target.value)}
//       />
//       <button onClick={sendOtp}>Send OTP</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default OtpSender;
