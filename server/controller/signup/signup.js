// const connection = require("../../connection/connection");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const util = require("util");
// // const ClickSend = require('clicksend');



// // Promisify the queries
// connection.query = util.promisify(connection.query);





// // ==================================== (add users api) ====================================
// // ===================================== (bcrypt.hash) =====================================

// // const addUser = async (req, res) => {

// //   const { first_name, last_name, username, email, password, contact, address, img } = req.body;
// //   // console.log(req.body);

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const status = "active"; 

// //   const sqlQuery = `
// //   INSERT INTO user  (first_name, last_name, username, email, password, contact, address, img,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
// //   const data = [first_name || '', last_name || '', username, email, hashedPassword, contact, address || '', img || '',status];
// //   // console.log(sqlQuery, data);

// //   connection.query(sqlQuery, data, (err) => {
// //     if (err) {
// //       return res.status(500)
// //     } else {
// //       return res.json(200)
// //     }
// //   });

// // };










// const addUser = async (req, res) => {
//   const { first_name, last_name, username, email, password, contact, address, img } = req.body;


//   const checkUserQuery = `SELECT * FROM user WHERE username = ?`;
  
//   connection.query(checkUserQuery, [username], async (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: "Database error" });
//       }
      
//       if (results.length > 0) {
//           return res.status(400).json({ error: "Username already exists" });
//       }

     
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const status = "active";

//       const sqlQuery = `
//           INSERT INTO user (first_name, last_name, username, email, password, contact, address, img, status) 
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//       const data = [
//           first_name || '', 
//           last_name || '', 
//           username, 
//           email, 
//           hashedPassword, 
//           contact, 
//           address || '', 
//           img || '', 
//           status
//       ];

//       connection.query(sqlQuery, data, (err) => {
//           if (err) {
//               return res.status(500).json({ error: "Failed to register user" });
//           } else {
//               return res.status(201).json({ message: "User registered successfully" });
//           }
//       });
//   });
// };

// // ===================================== (bcrypt.compare) =====================================



// // login api


// const login = async (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT * FROM user WHERE username = ?";
//   connection.query(sql, [username], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const user = results[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     return res.status(200).json({
//       message: "Login successful",
//       user_id: user.user_id,
//       username: user.username,  // Make sure to return username
//       status: user.status
//     });
//   });
// };








// // ==================================== (show users api) ====================================

// const getUser = (req, res) => {
//   const sqlQuery = "SELECT * FROM user";
//   connection.query(sqlQuery, (err, data) => {
//     if (err) {
//       return res.status(500)
//     } else {
//       return res.json(data);
//     }
//   });
// };



// // getuserby id



// const getuserbyid = (req, res) => {
//   const { id } = req.params;
//   const sqlQuery = "SELECT * FROM user WHERE user_id = ?";
//   connection.query(sqlQuery, [id], (err, data) => {
//     if (err) {
//       return res.status(500)
//     } else {
//       return res.json(data);
//     }
//   });
// };

// // ============================= Update User Status API =============================
// const userstatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["active", "inactive"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value. Allowed: 'active' or 'inactive'" });
//   }

//   connection.query("SELECT * FROM user WHERE user_id = ?", [id], (err, results) => {
//       if (err) {
//           console.error("Database error:", err);
//           return res.status(500).json({ error: "Database error while checking user" });
//       }

//       if (results.length === 0) {
//           return res.status(404).json({ message: "User not found" });
//       }

//       connection.query("UPDATE user SET status = ? WHERE user_id = ?", [status, id], (updateErr) => {
//           if (updateErr) {
//               console.error("Status update error:", updateErr);
//               return res.status(500).json({ error: "Error updating user status" });
//           }

//           console.log(`User ID ${id} status changed to ${status}`);
//           res.status(200).json({ message: "User status updated successfully", status });
//       });
//   });
// };





// // update data by id
// const updatedata = (req, res) => {
//   const { id } = req.params;
//   const { first_name, last_name, username, email, contact, address } = req.body;
//   const image = req.file ? req.file.filename : req.body.img || null;
//   const q = "UPDATE user SET first_name=?, last_name=?, username=?, email=?, contact=?, address=?, img=? WHERE user_id = ?";
//   const data = [first_name, last_name, username, email, contact, address, image, id];
//   connection.query(q, data, (err, results) => {
//     if (err) {
//       return res.status(500).json({ err: "internal server error " })
//     } else {
//       return res.status(200).json(results)
//     }
//   })

// }

// const deleteuser = (req, res) => {
//   const { id } = req.params;
//   const q = "DELETE FROM user WHERE user_id=?";
//   connection.query(q, [id], (err, results) => {
//     if (err) {
//       res.status(500).json({ err: "error in deleting" })
//     } else {
//       res.status(200).json(results);
//     }
//   })
// };




// // const sendOTP = async (req, res) => {
// //   try {
// //       const { email } = req.body;
// //       const otp = Math.floor(100000 + Math.random() * 900000);

// //       otpdata = otp;

// //       const transporter = nodemailer.createTransport({
// //           service: 'gmail',
// //           auth: {
// //               user: 'dhukamohammad5@gmail.com',
// //               pass: 'fghkhicfgsxhzmeq'
// //           }
// //       });
// //       const mailOptions = {
// //           from: 'dhukamohammad5@gmail.com',
// //           to: email,
// //           subject: 'OTP for registration',
// //           text: Your` OTP for registration is ${otp}`
// //       };

// // console.log(otp)
// //       await transporter.sendMail(mailOptions);
// //       res.status(200).send('OTP sent successfully');
// //   } catch (error) {
// //       console.error('Error sending OTP:', error);
// //       res.status(500).send('Error sending OTP');
// //   }
// // };

// // let otpStore = {
// //    asrarmaknogia786@gmail.com : 898989,
// //    basannofal@gmail.com : 898977
// // };



// // Send OTP for Password Reset
// const sendPasswordResetOTP = async (req, res) => {
//     try {
//         const { email } = req.body;
//         console.log("Executing query: SELECT * FROM user WHERE email = ?", [email]);
        
//         const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
//         console.log("Query Results:", results);
//         if (results.length === 0) {
//             return res.status(404).json({ error: "Email not found" });
//         }

       
//         const otp = Math.floor(100000 + Math.random() * 900000);
//         await connection.query("Update user set otp_code = ? where email = ? ", [otp, email])
//         console.log(`OTP for ${email}: ${otp}`);

       
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "asrarjabir786@gmail.com", 
//                 pass: "jtmj iihg koat dyvg" 
//             }
//         });

        
//         const mailOptions = {
//             from: "asrarjabir786@gmail.com",
//             to: email,
//             subject: "Password Reset OTP",
//             text: `Your OTP for password reset is: ${otp}`
//         };

  
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: "OTP sent successfully" });

//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).json({ error: "Error sending OTP" });
//     }
// };

// // Verify OTP & Reset Password
// const verifyOTPAndResetPassword = async (req, res) => {
//     try {
//         const { email, otp, newPassword } = req.body;

//         const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
//         console.log("Query Results:", results);
//         if (results.length === 0) {
//             return res.status(404).json({ error: "Email not found" });
//         }

//         console.log(results)

//         if(parseInt(results[0].otp_code) !== parseInt(otp)){
//           return res.status(400).json({ error: "Invalid or expired OTP" });
//         }

       

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update password in DB
//         await connection.query("UPDATE user SET password = ? WHERE email = ?", [hashedPassword, email]);

//         res.status(200).json({ message: "Password reset successfully" });

//     } catch (error) {
//         console.error("Error resetting password:", error);
//         res.status(500).json({ error: "Error resetting password" });
//     }
// };









// // ========================== (Signup API with OTP) ==========================

// // const sendSignupOTP = async (req, res) => {
// //   try {
// //       const { contact } = req.body;

// //       // Check if mobile number already exists
// //       const checkUserQuery = "SELECT * FROM user WHERE contact = ?";
// //       const existingUsers = await connection.query(checkUserQuery, [contact]);

// //       if (existingUsers.length > 0) {
// //           return res.status(400).json({ error: "Mobile number already exists" });
// //       }

// //       // Generate 6-digit OTP
// //       const otp = Math.floor(100000 + Math.random() * 900000);

// //       // Save OTP in DB
// //       const insertOTPQuery = "INSERT INTO otp_verification (contact, otp_code, created_at) VALUES (?, ?, NOW())";
// //       await connection.query(insertOTPQuery, [contact, otp]);

// //       // ClickSend SMS API से OTP भेजना
// //       const apiUsername = "your_clicksend_username";  
// //       const apiKey = "your_clicksend_api_key";  

// //       const smsMessage = {
// //           messages: [
// //               {
// //                   to: contact,
// //                   body: `Your OTP for signup is: ${otp}`,
// //                   source: "nodejs"
// //               }
// //           ]
// //       };

// //       const client = new ClickSend.SMS({ username: apiUsername, key: apiKey });

// //       client.sms.send(smsMessage)
// //           .then(response => {
// //               console.log("OTP sent:", response.body);
// //               res.status(200).json({ message: "OTP sent successfully" });
// //           })
// //           .catch(error => {
// //               console.error("Error sending OTP:", error);
// //               res.status(500).json({ error: "Error sending OTP" });
// //           });

// //   } catch (error) {
// //       console.error("Error:", error);
// //       res.status(500).json({ error: "Internal server error" });
// //   }
// // };

// // // ========================== (Verify OTP & Complete Signup) ==========================
// // const verifySignupOTP = async (req, res) => {
// //   try {
// //       const { contact, otp } = req.body;

// //       // Check OTP in database
// //       const checkOTPQuery = "SELECT * FROM otp_verification WHERE contact = ? ORDER BY created_at DESC LIMIT 1";
// //       const [rows] = await connection.query(checkOTPQuery, [contact]);

// //       if (rows.length === 0) {
// //           return res.status(400).json({ error: "OTP not found or expired" });
// //       }

// //       const storedOTP = rows[0].otp_code;

// //       if (otp != storedOTP) {
// //           return res.status(400).json({ error: "Invalid OTP" });
// //       }

// //       // OTP verified, delete OTP from DB
// //       const deleteOTPQuery = "DELETE FROM otp_verification WHERE contact = ?";
// //       await connection.query(deleteOTPQuery, [contact]);

// //       // अब यूज़र को रजिस्टर कर सकते हो
// //       const registerUserQuery = "INSERT INTO user (contact) VALUES (?)";
// //       await connection.query(registerUserQuery, [contact]);

// //       res.status(200).json({ message: "OTP verified, user registered successfully" });

// //   } catch (error) {
// //       console.error("Error:", error);
// //       res.status(500).json({ error: "Internal server error" });
// //   }
// // };





// module.exports = {
//   getUser,
//   addUser,
//   login,
//   userstatus,
//   getuserbyid,
//   updatedata,
//   deleteuser,
//   // sendOTP
//   sendPasswordResetOTP,
//   verifyOTPAndResetPassword,
//   // sendSignupOTP,
//   //   verifySignupOTP
// };



















































































const connection = require("../../connection/connection");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const util = require("util");




// Promisify the queries
connection.query = util.promisify(connection.query);





// ==================================== (add users api) ====================================
// ===================================== (bcrypt.hash) =====================================

// const addUser = async (req, res) => {
//   const { first_name, last_name, username, email, password, contact, address, img } = req.body;

//   try {
//       // Check if username or email already exists
//       const checkUserQuery = `SELECT * FROM user WHERE username = ? OR email = ?`;
      
//       connection.query(checkUserQuery, [username, email], async (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: "Database error" });
//           }

//           if (results.length > 0) {
//               // Check which field is already taken
//               const existingUser = results[0];
              
//               if (existingUser.username === username) {
//                   return res.status(400).json({ error: "Username already exists" });
//               }

//               if (existingUser.email === email) {
//                   return res.status(400).json({ error: "Email already exists" });
//               }
//           }

//           // Hash password
//           const hashedPassword = await bcrypt.hash(password, 10);
//           const status = "active";

//           // Insert new user
//           const sqlQuery = `
//               INSERT INTO user (first_name, last_name, username, email, password, contact, address, img, status) 
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//           const data = [
//               first_name || '', 
//               last_name || '', 
//               username, 
//               email, 
//               hashedPassword, 
//               contact, 
//               address || '', 
//               img || '', 
//               status
//           ];

//           connection.query(sqlQuery, data, (err) => {
//               if (err) {
//                   return res.status(500).json({ error: "Failed to register user" });
//               } else {
//                   return res.status(201).json({ message: "User registered successfully" });
//               }
//           });
//       });
//   } catch (error) {
//       console.error("Error adding user:", error);
//       res.status(500).json({ error: "Server error" });
//   }
// };



const addUser = async (req, res) => {
  const { first_name, last_name, username, email, password, contact, address, img } = req.body;

  try {
      // // Email validation
      // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      // if (!emailRegex.test(email)) {
      //     return res.status(400).json({ error: "Invalid email format. Please use a valid @gmail.com email." });
      // }

      // Check if username or email already exists
      const checkUserQuery = `SELECT * FROM user WHERE username = ? OR email = ?`;
      
      connection.query(checkUserQuery, [username, email], async (err, results) => {
          if (err) {
              return res.status(500).json({ error: "Database error" });
          }

          // if (results.length > 0) {
          //     // Check which field is already taken
          //     const existingUser = results[0];
              
          //     if (existingUser.username === username) {
          //         return res.status(400).json({ error: "Username already exists" });
          //     }

          //     if (existingUser.email === email) {
          //         return res.status(400).json({ error: "Email already exists" });
          //     }
          // }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          const status = "active";

          // Insert new user
          const sqlQuery = `
              INSERT INTO user (first_name, last_name, username, email, password, contact, address, img, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const data = [
              first_name || '', 
              last_name || '', 
              username, 
              email, 
              hashedPassword, 
              contact, 
              address || '', 
              img || '', 
              status
          ];

          connection.query(sqlQuery, data, (err) => {
              if (err) {
                  return res.status(500).json({ error: "Failed to register user" });
              } else {
                  return res.status(201).json({ message: "User registered successfully" });
              }
          });
      });
  } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Server error" });
  }
};






// ===================================== (bcrypt.compare) =====================================



// login api


const login = async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  connection.query(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,  // Make sure to return username
      status: user.status
    });
  });
};








// ==================================== (show users api) ====================================

const getUser = (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  connection.query(sqlQuery, (err, data) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(data);
    }
  });
};



// getuserby id



const getuserbyid = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM user WHERE user_id = ?";
  connection.query(sqlQuery, [id], (err, data) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(data);
    }
  });
};

// ============================= Update User Status API =============================
const userstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Allowed: 'active' or 'inactive'" });
  }

  connection.query("SELECT * FROM user WHERE user_id = ?", [id], (err, results) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error while checking user" });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      connection.query("UPDATE user SET status = ? WHERE user_id = ?", [status, id], (updateErr) => {
          if (updateErr) {
              console.error("Status update error:", updateErr);
              return res.status(500).json({ error: "Error updating user status" });
          }

          res.status(200).json({ message: "User status updated successfully", status });
      });
  });
};





// update data by id
const updatedata = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, email, contact, address } = req.body;
  const image = req.file ? req.file.filename : req.body.img || null;
  const q = "UPDATE user SET first_name=?, last_name=?, username=?, email=?, contact=?, address=?, img=? WHERE user_id = ?";
  const data = [first_name, last_name, username, email, contact, address, image, id];
  connection.query(q, data, (err, results) => {
    if (err) {
      return res.status(500).json({ err: "internal server error " })
    } else {
      return res.status(200).json(results)
    }
  })

}



// delete api
const deleteuser = (req, res) => {
  const { id } = req.params;


  // First, delete from cart table where product_id is referenced
  const deleteFromCart = "DELETE FROM cart WHERE user_id = ?";
  connection.query(deleteFromCart, [id], (err, results) => {
      if (err) {
          console.error("Error deleting from cart:", err);
          return res.status(500).json({ error: "Error deleting product from cart", details: err });
      }

      // Now, delete from products table
      const deleteFromProducts = "DELETE FROM user WHERE user_id=?";
      connection.query(deleteFromProducts, [id], (err, results) => {
          if (err) {
              console.error("Error deleting product:", err);
              return res.status(500).json({ error: "Error deleting product", details: err });
          }

          res.status(200).json({ message: "Product deleted successfully" });
      });
  });
};



// Send OTP for Password Reset
const sendPasswordResetOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if email exists in database
        const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
        if (results.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        await connection.query("Update user set otp_code = ? where email = ? ", [otp, email])

        // Create transporter
       

      //   const transporter = nodemailer.createTransport({
      //     host: "smtp.gmail.com",
      //     port: 465, // 587 भी ट्राय कर सकते हो (TLS के लिए)
      //     secure: true, // true for 465, false for 587
      //     auth: {
      //         user: process.env.EMAIL_USER, // तुम्हारी Gmail ID
      //         pass: process.env.EMAIL_PASS  // App Password
      //     }
      // });


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // तुम्हारी Gmail ID
            pass: process.env.EMAIL_PASS   // Gmail App Password
        }
    });
     
      
        

        const mailOptions = {
          from: `"Zepx" <${process.env.EMAIL_USER}>`, // Proper format में डालो
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP for password reset is: ${otp}`
      };




    
      

        // Send OTP email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Error sending OTP" });
    }
};



const verifyOTPCheck = async (req, res) => {
  try {
      const { email, otp } = req.body;

      const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);

      if (results.length === 0) {
          return res.status(404).json({ error: "Email not found" });
      }

      if (parseInt(results[0].otp_code) !== parseInt(otp)) {
          return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
  }
};

// Verify OTP and Reset Password
const verifyOTP = async (req, res) => {
  try {
      const { email, otp, newPassword } = req.body;

      const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);

      if (results.length === 0) {
          return res.status(404).json({ error: "Email not found" });
      }

      if (parseInt(results[0].otp_code) !== parseInt(otp)) {
          return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in DB
      await connection.query("UPDATE user SET password = ? WHERE email = ?", [hashedPassword, email]);

      res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Error resetting password" });
  }
};




















// const ONLYSMS_API_URL = "https://onlysms.co.in/api/sms.aspx";
// const ONLYSMS_CREDENTIALS = {
//   UserID: "ansitechno",
//   UserPass: "AQnsi@123$",
//   GSMID: "ANSCHP",
//   PEID: "1701172026671834036",
//   TEMPID: "1707172052603722777",
//   UNICODE: "TEXT"
// };

// const signupOTP= async (req, res) => {
//   try {
//     const { mobile, otp } = req.body;
//     if (!mobile || !otp) {
//       return res.status(400).json({ message: "Mobile number and OTP are required" });
//     }

//     const message = `Your OTP for ANSI TECHNO verification is: ${otp}. This OTP will expire in 10 minutes. Do not share this code with anyone.`;

//     const params = new URLSearchParams({
//       UserID: ONLYSMS_CREDENTIALS.UserID,
//       UserPass: ONLYSMS_CREDENTIALS.UserPass,
//       MobileNo: mobile,
//       GSMID: ONLYSMS_CREDENTIALS.GSMID,
//       PEID: ONLYSMS_CREDENTIALS.PEID,
//       Message: message,
//       TEMPID: ONLYSMS_CREDENTIALS.TEMPID,
//       UNICODE: ONLYSMS_CREDENTIALS.UNICODE
//     });

//     const response = await axios.get(`${ONLYSMS_API_URL}?${params.toString()}`);

//     return res.json({ success: true, response: response.data });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };




module.exports = {
  getUser,
  addUser,
  login,
  userstatus,
  getuserbyid,
  updatedata,
  deleteuser,
  // sendOTP
  sendPasswordResetOTP,
  verifyOTPCheck,
  verifyOTP,
  // signupOTP

};