// import React, { useContext, useEffect, useState, } from 'react';    
// import { useNavigate, useLocation } from "react-router-dom";
// import "../../assets/css/account.css";
// import UserInfo from "./UserInfo";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import Footer from "../footer/Footer";
// import { NavLink } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import { CartContext } from "../../context/CartContext";
// import "../../assets/css/logoutPopup/logoutpopup.css"


// const port = process.env.REACT_APP_URL;



// const Account = () => {
//   const { setUser } = useContext(CartContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);

//   useEffect(() => {
//     if (location.pathname === "/user") {
//       setActiveTab("dashboard");
//     } else if (location.pathname === "/user/account-info") {
//       setActiveTab("account");
//     } else if (location.pathname === "/cart") {
//       setActiveTab("cart");
//     }
//   }, [location.pathname]);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

// //   const handleLogout = () => {
// //     // const confirmLogout = window.confirm("Are you sure you want to logout?");
// // // toast.confirmLogout('are you sure you want to logout');
// //      const confirmLogout = toast.warn("Are you sure you want to logout?");

// //     if (confirmLogout) {
// //       localStorage.removeItem("user_id");
// //       localStorage.removeItem("cart");
// //       localStorage.removeItem("isLoggedIn");
// //       navigate("/login");
// //       setUser(null)
// //     }
// //   };

// const handleLogout = () => {
//   toast(
//     <div className="toast-container">
//       <p className="toast-message">Are you sure you want to logout?</p>
//       <div className="toast-button-container">
//         <button onClick={confirmLogout} className="toast-logout-button">LogOut</button>
//         <button onClick={() => toast.dismiss()} className="toast-cancel-button">Cancel</button>
//       </div>
//     </div>,
//     {
//       position: "top-center",
//       autoClose: false,
//       closeOnClick: false,
//       draggable: false,
//       closeButton: false,
//       hideProgressBar: true,
//     }
//   );
// };

// const confirmLogout = () => {
//   localStorage.removeItem("user_id");
//   localStorage.removeItem("cart");
//   localStorage.removeItem("isLoggedIn");
  
//   // toast.success("please login again for better sewrvices")
//   navigate("/login");
//    setTimeout(() => {
//                   toast.info("please login again for better services");
                  
//               }, 200);
  
//   setUser(null)
//   toast.dismiss();
// };


//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const fetchUserData = async (id) => {
//     try {
//       const response = await axios.get(`${port}/getuserbyid/${id}`);
//       setUserData(response.data[0]);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const handleEditAccount = () => {
//     if (userData?.user_id) {
//       localStorage.setItem("user_id", userData.user_id); // Store user_id in localStorage
//       navigate("/user/account-info", { state: { user_id: userData.user_id } });
//     }
//   };


//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="sub-dashboard">
//           <div className="account-hamburger" onClick={toggleDropdown}>
//             <i className="fa-solid fa-bars"></i>
//           </div>

//           <div className={`account-hamburger-section ${isDropdownOpen ? "show" : ""}`}>
//             <div className="account-hamburger-dropdown">
//               <ul>
//                 <li
//                   onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
//                   className={activeTab === "dashboard" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-list"></i> Dashboard
//                 </li>
//                 <li
//                   onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
//                   className={activeTab === "account" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-user"></i> Account Info
//                 </li>
                
//                 <li
//                   onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
//                   className={activeTab === "cart" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
//                 </li>
//                 <li onClick={handleLogout} className="logout">
//                   <i className="fa-solid fa-sign-out-alt"></i> Logout
//                 </li>
//               </ul>
//             </div>
//             <div className="account-hamburger-dropdown-cancel">
//               <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
//             </div>
//           </div>

//           <div className="sidebar">
//             <ul>
//               <li
//                 onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
//                 className={activeTab === "dashboard" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-list"></i> Dashboard
//               </li>
//               <li
//                 onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
//                 className={activeTab === "account" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-user"></i> Account Info
//               </li>
//               <li
//                 onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
//                 className={activeTab === "cart" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
//               </li>
//               <li onClick={handleLogout} className="logout">
//                 <i className="fa-solid fa-sign-out-alt"></i> Logout
//               </li>
//             </ul>
//           </div>

//           <div className="content">
//             {activeTab === "dashboard" && (
//               <div className="content-dashboard">
//                 <div className="sub1-dashboard">
//                   {userData ? (
//                     <>
//                       <h3>Hello, {userData.username}</h3>
//                       <p>
//                         From your account dashboard, you can easily check & view your recent orders,
//                         manage your shipping and billing addresses, and edit your password and account details.
//                       </p>
//                     </>
//                   ) : (
//                     <p>Loading user data...</p>
//                   )}
//                 </div>
//                 <div className="sub2-dashboard">
//                   <div className="sub2-item">
//                     <h6>Account Info</h6>
//                     <div className="sub2-item1">
//                       {userData && (
//                         <div className="dashboard-img">
//                           <div className="dashboard-img1">
//                             <img
//                               src={
//                                 userData.img instanceof File
//                                   ? URL.createObjectURL(userData.img)
//                                   : userData.img
//                                     ? `/uploads/${userData.img}`  // Ensure correct path
//                                     : require('../../assets/images/profile.jpg')
//                               }
//                               alt="User"
//                             />
//                           </div>

//                           <div className="dashboard-name"><p>{userData.username}</p></div>
//                         </div>
//                       )}
//                       <div className="dashboard-info">
//                         {userData && (
//                           <>
//                             <p>Email: <span>{userData.email}</span></p>
//                             <p>Phone: <span>{userData.contact}</span></p>
//                           </>
//                         )}
//                       </div>
//                       <div className="dashboard-btn">
//                         <NavLink to="/user/account-info">
//                           <button onClick={handleEditAccount}>Edit Account</button>
//                         </NavLink>

//                       </div>
//                     </div>
//                   </div>
//                   <div className="sub2-item">
//                     <h6>Address Info</h6>
//                     <div className="sub2-item1">
//                       <div className="dashboard-info">
//                         {userData ? (
//                           <>
//                             <p className="para1">{userData.address || "Not Provided"}</p>
//                             <p>Phone: <span>{userData.contact}</span></p>
//                             <p>Email: <span>{userData.email}</span></p>
//                           </>
//                         ) : (
//                           <p>Loading address info...</p>
//                         )}
//                       </div>
//                       <div className="dashboard-btn">
//                         <button>Edit Account</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "account" && <UserInfo />}

//             {activeTab === "cart" && (
//               <div className="content-cart">
//                 <h1>Your Shopping Cart</h1>
//                 <p>Cart items will be displayed here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer autoClose="2000"/>
//     </>
//   );
// };

// export default Account;


























// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import "../../assets/css/account.css";
// import UserInfo from "./UserInfo";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import Footer from "../footer/Footer";
// import { CartContext } from "../../context/CartContext";
// import { NavLink } from "react-router-dom";
// import OrderHistory from '../order/Order-History';
// // import OrderHistory from './OrderHistory';

// const port = process.env.REACT_APP_URL;



// const Account = () => {

//   const { setUser } = useContext(CartContext);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (location.pathname === "/user") {
//       setActiveTab("dashboard");
//     } else if (location.pathname === "/user/account-info") {
//       setActiveTab("account");
//     } else if (location.pathname === "/user/order-history") {
//       setActiveTab("order");
//     } else if (location.pathname === "/cart") {
//       setActiveTab("cart");
//     }
//   }, [location.pathname]);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("user_id");
//       localStorage.removeItem("cart");
//       localStorage.removeItem("isLoggedIn");
//       setUser(null);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const fetchUserData = async (id) => {
//     try {
//       const response = await axios.get(`${port}/getuserbyid/${id}`);
//       setUserData(response.data[0]);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const handleEditAccount = () => {
//     if (userData?.user_id) {
//       localStorage.setItem("user_id", userData.user_id); // Store user_id in localStorage
//       navigate("/user/account-info", { state: { user_id: userData.user_id } });
//     }
//   };


//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="sub-dashboard">
//           <div className="account-hamburger" onClick={toggleDropdown}>
//             <i className="fa-solid fa-bars"></i>
//           </div>

//           <div className={`account-hamburger-section ${isDropdownOpen ? "show" : ""}`}>
//             <div className="account-hamburger-dropdown">
//               <ul>
//                 <li
//                   onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
//                   className={activeTab === "dashboard" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-list"></i> Dashboard
//                 </li>
//                 <li
//                   onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
//                   className={activeTab === "account" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-user"></i> Account Info
//                 </li>
//                 <li
//                   onClick={() => { setActiveTab("order"); navigate("/user/order-history"); }}
//                   className={activeTab === "order" ? "active-tab" : ""}
//                 >
//                   <i class="fa-solid fa-clock-rotate-left"></i> Order History
//                 </li>
//                 <li
//                   onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
//                   className={activeTab === "cart" ? "active-tab" : ""}
//                 >
//                   <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
//                 </li>
//                 <li onClick={handleLogout} className="logout">
//                   <i className="fa-solid fa-sign-out-alt"></i> Logout
//                 </li>
//               </ul>
//             </div>
//             <div className="account-hamburger-dropdown-cancel">
//               <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
//             </div>
//           </div>

//           <div className="sidebar">
//             <ul>
//               <li
//                 onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
//                 className={activeTab === "dashboard" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-list"></i> Dashboard
//               </li>
//               <li
//                 onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
//                 className={activeTab === "account" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-user"></i> Account Info
//               </li>
//               <li
//                 onClick={() => { setActiveTab("order"); navigate("/user/order-history"); }}
//                 className={activeTab === "order" ? "active-tab" : ""}
//               >
//                 <i class="fa-solid fa-clock-rotate-left"></i> Order History
//               </li>
//               <li
//                 onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
//                 className={activeTab === "cart" ? "active-tab" : ""}
//               >
//                 <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
//               </li>
//               <li onClick={handleLogout} className="logout">
//                 <i className="fa-solid fa-sign-out-alt"></i> Logout
//               </li>
//             </ul>
//           </div>

//           <div className="content">
//             {activeTab === "dashboard" && (
//               <div className="content-dashboard">
//                 <div className="sub1-dashboard">
//                   {userData ? (
//                     <>
//                       <h3>Hello, {userData.username}</h3>
//                       <p>
//                         From your account dashboard, you can easily check & view your recent orders,
//                         manage your shipping and billing addresses, and edit your password and account details.
//                       </p>
//                     </>
//                   ) : (
//                     <p>Loading user data...</p>
//                   )}
//                 </div>
//                 <div className="sub2-dashboard">
//                   <div className="sub2-item">
//                     <h6>Account Info</h6>
//                     <div className="sub2-item1">
//                       {userData && (
//                         <div className="dashboard-img">
//                           <div className="dashboard-img1">
//                             <img
//                               src={
//                                 userData.img instanceof File
//                                   ? URL.createObjectURL(userData.img)
//                                   : userData.img
//                                     ? `/uploads/${userData.img}`  // Ensure correct path
//                                     : require('../../assets/images/profile.jpg')
//                               }
//                               alt="User"
//                             />
//                           </div>

//                           <div className="dashboard-name"><p>{userData.username}</p></div>
//                         </div>
//                       )}
//                       <div className="dashboard-info">
//                         {userData && (
//                           <>
//                             <p><span><p>Email:</p> </span> {userData.email}</p>
//                             <p><span><p>Phone:</p> </span> {userData.contact}</p>
//                           </>
//                         )}
//                       </div>
//                       <div className="dashboard-btn">
//                         <NavLink to="/user/account-info">
//                           <button onClick={handleEditAccount}>Edit Account</button>
//                         </NavLink>

//                       </div>
//                     </div>
//                   </div>
//                   <div className="sub2-item">
//                     <h6>Address Info</h6>
//                     <div className="sub2-item1">
//                       <div className="dashboard-info">
//                         {userData ? (
//                           <>
//                             <p className="para1">{userData.address || "Not Provided"}</p>
//                             <p><span><p>Phone:</p> </span>{userData.contact}</p>
//                             <p><span><p>Email:</p> </span> {userData.email}</p>
//                           </>
//                         ) : (
//                           <p>Loading address info...</p>
//                         )}
//                       </div>
//                       <div className="dashboard-btn">
//                         <button>Edit Account</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "account" && <UserInfo />}
//             {activeTab === "order" && <OrderHistory />}
//             {activeTab === "cart" && (
//               <div className="content-cart">
//                 <h1>Your Shopping Cart</h1>
//                 <p>Cart items will be displayed here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Account;










import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/account.css";
import UserInfo from "./UserInfo";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { CartContext } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import OrderHistory from '../order/Order-History';
import ConfirmLogoutModal from '../../components/models/ConfirmModel'; // Import the modal component

const port = process.env.REACT_APP_URL;

const Account = () => {
  const { setUser } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

  useEffect(() => {
    if (location.pathname === "/user") {
      setActiveTab("dashboard");
    } else if (location.pathname === "/user/account-info") {
      setActiveTab("account");
    } else if (location.pathname === "/user/order-history") {
      setActiveTab("order");
    } else if (location.pathname === "/cart") {
      setActiveTab("cart");
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsModalOpen(true);  // Open the modal instead of window.confirm
  };

  const confirmLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("cart");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    navigate("/login");
    setIsModalOpen(false);  // Close the modal after confirmation
  };

  const cancelLogout = () => {
    setIsModalOpen(false);  // Close the modal if canceled
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`${port}/getuserbyid/${id}`);
      setUserData(response.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditAccount = () => {
    if (userData?.user_id) {
      localStorage.setItem("user_id", userData.user_id); // Store user_id in localStorage
      navigate("/user/account-info", { state: { user_id: userData.user_id } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sub-dashboard">
          <div className="account-hamburger" onClick={toggleDropdown}>
            <i className="fa-solid fa-bars"></i>
          </div>

          <div className={`account-hamburger-section ${isDropdownOpen ? "show" : ""}`}>
            <div className="account-hamburger-dropdown">
              <ul>
                <li
                  onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
                  className={activeTab === "dashboard" ? "active-tab" : ""}
                >
                  <i className="fa-solid fa-list"></i> Dashboard
                </li>
                <li
                  onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
                  className={activeTab === "account" ? "active-tab" : ""}
                >
                  <i className="fa-solid fa-user"></i> Account Info
                </li>
                <li
                  onClick={() => { setActiveTab("order"); navigate("/user/order-history"); }}
                  className={activeTab === "order" ? "active-tab" : ""}
                >
                  <i className="fa-solid fa-clock-rotate-left"></i> Order History
                </li>
                <li
                  onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
                  className={activeTab === "cart" ? "active-tab" : ""}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
                </li>
                <li onClick={handleLogout} className="logout">
                  <i className="fa-solid fa-sign-out-alt"></i> Logout
                </li>
              </ul>
            </div>
            <div className="account-hamburger-dropdown-cancel">
              <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
            </div>
          </div>

          <div className="sidebar">
            <ul>
              <li
                onClick={() => { setActiveTab("dashboard"); navigate("/user"); }}
                className={activeTab === "dashboard" ? "active-tab" : ""}
              >
                <i className="fa-solid fa-list"></i> Dashboard
              </li>
              <li
                onClick={() => { setActiveTab("account"); navigate("/user/account-info"); }}
                className={activeTab === "account" ? "active-tab" : ""}
              >
                <i className="fa-solid fa-user"></i> Account Info
              </li>
              <li
                onClick={() => { setActiveTab("order"); navigate("/user/order-history"); }}
                className={activeTab === "order" ? "active-tab" : ""}
              >
                <i className="fa-solid fa-clock-rotate-left"></i> Order History
              </li>
              <li
                onClick={() => { setActiveTab("cart"); navigate("/cart"); }}
                className={activeTab === "cart" ? "active-tab" : ""}
              >
                <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
              </li>
              <li onClick={handleLogout} className="logout">
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </li>
            </ul>
          </div>

          {/* Modal for Logout Confirmation */}
          <ConfirmLogoutModal
            isOpen={isModalOpen}
            onClose={cancelLogout}
            onConfirm={confirmLogout}
          />

          <div className="content">
            {activeTab === "dashboard" && (
              <div className="content-dashboard">
                <div className="sub1-dashboard">
                  {userData ? (
                    <>
                      <h3>Hello, {userData.username}</h3>
                      <p>
                        From your account dashboard, you can easily check & view your recent orders,
                        manage your shipping and billing addresses, and edit your password and account details.
                      </p>
                    </>
                  ) : (
                    <p>Loading user data...</p>
                  )}
                </div>
                <div className="sub2-dashboard">
                  <div className="sub2-item">
                    <h6>Account Info</h6>
                    <div className="sub2-item1">
                      {userData && (
                        <div className="dashboard-img">
                          <div className="dashboard-img1">
                            <img
                              src={
                                userData.img instanceof File
                                  ? URL.createObjectURL(userData.img)
                                  : userData.img
                                    ? `/uploads/${userData.img}` // Ensure correct path
                                    : require('../../assets/images/profile.jpg')
                              }
                              alt="User"
                            />
                          </div>

                          <div className="dashboard-name"><p>{userData.username}</p></div>
                        </div>
                      )}
                      <div className="dashboard-info">
                        {userData && (
                          <>
                            <p><span><p>Email:</p> </span> {userData.email}</p>
                            <p><span><p>Phone:</p> </span> {userData.contact}</p>
                          </>
                        )}
                      </div>
                      <div className="dashboard-btn">
                        <NavLink to="/user/account-info">
                          <button onClick={handleEditAccount}>Edit Account</button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="sub2-item">
                    <h6>Address Info</h6>
                    <div className="sub2-item1">
                      <div className="dashboard-info">
                        {userData ? (
                          <>
                            <p className="para1">{userData.address || "Not Provided"}</p>
                            <p><span><p>Phone:</p> </span>{userData.contact}</p>
                            <p><span><p>Email:</p> </span> {userData.email}</p>
                          </>
                        ) : (
                          <p>Loading address info...</p>
                        )}
                      </div>
                      <div className="dashboard-btn">
                        <button>Edit Account</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && <UserInfo />}
            {activeTab === "order" && <OrderHistory />}
            {activeTab === "cart" && (
              <div className="content-cart">
                <h1>Your Shopping Cart</h1>
                <p>Cart items will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
