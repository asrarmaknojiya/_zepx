// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../assets/css/checkout.css";
// import Navbar from '../navbar/Navbar'
// import Footer from '../footer/Footer'

// const port = process.env.REACT_APP_URL;


// function CheckOut() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const fromCart = location.state?.fromCart;
//     const fromItem = location.state?.fromItem;
    
//     // Get data based on source page
//     const cartItems = location.state?.cartItems || [];
//     const cartSummary = location.state?.summary || {};
    
//     // Single product data (from Item.js)
//     const singleItem = location.state?.singleItem || {};
//     const productData = fromItem ? singleItem.product : location.state?.productData;
//     const productQuantity = fromItem ? singleItem.quantity : (location.state?.quantity || 1);
    
//     // Get first image from product if available
//     const productImages = productData && productData.img ? JSON.parse(productData.img || "[]") : [];
//     const productImage = productImages.length > 0 ? productImages[0] : null;

//     const [editdata, setEditdata] = useState({
//         first_name: "",
//         last_name: "",
//         username: "",
//         email: "",
//         contact: "",
//         address: "",
//         img: null
//     });
//     const [error, setError] = useState(null);

//     const userId = location.state?.user_id || localStorage.getItem("user_id");

//     const fetchdatabyid = async (id) => {
//         try {
//             const response = await axios.get(${port}/getuserbyid/${id});
//             setEditdata(response.data[0])
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditdata((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formdata = new FormData();
//             formdata.append("first_name", editdata.first_name);
//             formdata.append("last_name", editdata.last_name);
//             formdata.append("username", editdata.username);
//             formdata.append("email", editdata.email);
//             formdata.append("contact", editdata.contact);
//             formdata.append("address", editdata.address);

//             await axios.put(${port}/updatedata/${userId}, formdata, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });

//             // Here you would also handle the order creation
//             alert("Order placed successfully!");
//             navigate("/");
//         } catch (error) {
//             setError("Error updating user data. Please try again.");
//         }
//     };

//     useEffect(() => {
//         if (userId) {
//             fetchdatabyid(userId);
//         } else {
//             navigate("/login");
//         }
//     }, [userId, navigate]);

//     const truncateString = (str, maxLength) => {
//         if (str && str.length > maxLength) {
//             return str.substring(0, maxLength) + '...';
//         } else {
//             return str;
//         }
//     };

//     const calculateOrderSummary = () => {
//         // If coming from Cart page
//         if (fromCart) {
//             return {
//                 subtotal: cartSummary.subTotal || 0,
//                 shipping: 0,
//                 discount: cartSummary.discount || 0,
//                 tax: cartSummary.tax || 0,
//                 total: cartSummary.total || 0
//             };
//         }
    
//         // If coming from Item page with singleItem
//         if (fromItem && singleItem && singleItem.product) {
//             const product = singleItem.product;
//             const quantity = singleItem.quantity;
            
//             // Get the discounted price
//             const discountAmount = (product.price * (product.discount)) / 100;
//             const discountedPrice = product.price - discountAmount;
            
//             // Calculate totals
//             const subtotal = discountedPrice * quantity;
//             const shipping = product.shipping || 0;
//             const discount = discountAmount * quantity;
//             const tax = ((product.tax) / 100) * (product.price * quantity);
//             const total = (subtotal + shipping + tax);
            
//             return {
//                 subtotal,
//                 shipping,
//                 discount,
//                 tax,
//                 total
//             };
//         }
    
//         // Fallback calculation if neither of the above conditions match
//         if (!productData) return {
//             subtotal: 0,
//             shipping: 0,
//             discount: 0,
//             tax: 0,
//             total: 0
//         };
    
//         const price = productData.price;
//         const discount = ((productData.discount) / 100) * price;
//         const discountedPrice = price - discount;
        
//         const subtotal = discountedPrice * productQuantity;
//         const shipping = productData.shipping ;
//         const discountTotal = discount * productQuantity;
//         const tax = ((productData.tax ) / 100) * (price * productQuantity);
//         const total = subtotal + shipping + tax;
    
//         return {
//             subtotal,
//             shipping,
//             discount: discountTotal,
//             tax,
//             total
//         };
//     };

//     const orderSummary = calculateOrderSummary();

//     // For debugging
//     useEffect(() => {
        
//     }, [location.state, fromCart, fromItem, productData, singleItem]);

//     return (
//         <div>
//             <Navbar />
//             <div className='container'>
//                 <div className='checkOut'>
//                     <form onSubmit={handleSubmit}>
//                         <div className='checkOut-section'>
//                             <div className='chekout-address'>
//                                 <div className='chekout-address-section'>
//                                     <div className='chekout-address-heading'>
//                                         <p>Billing Information</p>
//                                     </div>
//                                     <div className='chekout-address-information'>
//                                         <div className='chekout-name-section'>
//                                             <div className='chekout-name'>
//                                                 <div className='div'>
//                                                     <label>User Name</label>
//                                                 </div>
//                                                 <div className='checkout-names'>
//                                                     <input
//                                                         type="text"
//                                                         placeholder='First name'
//                                                         id="firstName"
//                                                         name="first_name"
//                                                         value={editdata.first_name || ""}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                     <input type='text' placeholder='Last name' id="lastName" name="last_name" value={editdata.last_name || ""} onChange={handleChange} required />
//                                                 </div>
//                                             </div>
//                                             <div className='chekout-compnay-name'>
//                                                 <div className='div'>
//                                                     <label>Compnay Name <span className='optional'>(Optional)</span></label>
//                                                 </div>
//                                                 <div className='div'>
//                                                     <input type='text' placeholder='Enter Your Compnay Name' />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='checkout-address'>
//                                             <div className='checkout-address-section'>
//                                                 <div className='div'>
//                                                     <label>Address</label>
//                                                 </div>
//                                                 <div className='div'>
//                                                     <input type='text' placeholder='Enter Your Address' id="address" name="address" value={editdata.address || ""} onChange={handleChange} required />
//                                                 </div>
//                                             </div>
//                                             <div className='checkout-zipcode'>
//                                                 <div className='div'>
//                                                     <label>Zip Code</label>
//                                                 </div>
//                                                 <div className='div'>
//                                                     <input type='text' placeholder='ex.123456' required />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='checkout-conatct'>
//                                             <div className='checkout-email checkout-conatct-info'>
//                                                 <div className='div'>
//                                                     <label>Email</label>
//                                                 </div>
//                                                 <div className='div'>
//                                                     <input type='text' placeholder='example.@gmail.com' id="email" name="email" value={editdata.email || ""} onChange={handleChange} required />
//                                                 </div>
//                                             </div>
//                                             <div className='checkout-number checkout-conatct-info'>
//                                                 <div className='div'>
//                                                     <label>Phone Number</label>
//                                                 </div>
//                                                 <div className='div'>
//                                                     <input type='text' placeholder='ex.1234567890' value={editdata.contact || ""} id="contact" name="contact" onChange={handleChange} required />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='chekout-payment-section'>
//                                     <div className='payment-section'>
//                                         <div className='payment-section-heading'>
//                                             <p>Payment Option</p>
//                                         </div>
//                                         <div className='payment-type-section'>
//                                             <div className='payment-type'>
//                                                 <i className="fa-solid fa-hand-holding-dollar"></i>
//                                                 <p>Cash on Delivery</p>
//                                                 <input type='radio' name="payment" required />
//                                             </div>
//                                             <div className='payment-type payment'>
//                                                 <i className="fa-solid fa-credit-card"></i>
//                                                 <p>Online Payment</p>
//                                                 <input type='radio' name="payment" required />
//                                             </div>
//                                             <div className='payment-type'>
//                                                 <i className="fa-brands fa-google-wallet"></i>
//                                                 <p>My Wallet</p>
//                                                 <input type='radio' name="payment" required />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='chekout-additionl-section'>
//                                     <div className='additionl-section-heading'>
//                                         <p>Additional Information</p>
//                                     </div>
//                                     <div className='div'>
//                                         <label>Order Notes <span className='optional'>(Optional)</span></label>
//                                     </div>
//                                     <div className='div'>
//                                         <textarea placeholder='Notes about your order, e.g. special notes for delivery' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='chekout-product'>
//                                 <div className='chekout-product-section'>
//                                     <div className='chekout-product-heading'>
//                                         <p>Order Summary</p>
//                                     </div>
                                    
//                                     {/* Display cart items if coming from cart */}
//                                     {fromCart && cartItems.length > 0 ? (
//                                         <div className='chekout-item-contiant'>
//                                             {cartItems.filter(item => item.product).map((item, index) => (
//                                                 <div className='chekout-item' key={item.product_id}>
//                                                     <div className='chekout-item-img-section'>
//                                                         <div className='chekout-item-img'>
//                                                             {item.product && item.product.img ? (
//                                                                 JSON.parse(item.product.img || "[]")[0] && (
//                                                                     <img src={/uploads/${JSON.parse(item.product.img || "[]")[0]}} alt={item.product.title} />
//                                                                 )
//                                                             ) : (
//                                                                 <img src={require("../../assets/images/item1.png")} alt='Product' />
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <div className='chekout-item-section'>
//                                                         <div className='chekout-item-name'>
//                                                             <p>{truncateString(item.product.title, 28)}</p>
//                                                         </div>
//                                                         <div className='chekout-item-quantity'>
//                                                             <p className='checkout-bill-font'>{item.quantity} × <span>₹{item.product.price}</span></p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : fromItem && productData ? (
//                                         // Display single product if coming from item page
//                                         <div className='chekout-item-contiant'>
//                                             <div className='chekout-item'>
//                                                 <div className='chekout-item-img-section'>
//                                                     <div className='chekout-item-img'>
//                                                         {productImage ? (
//                                                             <img src={/uploads/${productImage}} alt={productData.title} />
//                                                         ) : (
//                                                             <img src={require("../../assets/images/item1.png")} alt='Product' />
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className='chekout-item-section'>
//                                                     <div className='chekout-item-name'>
//                                                         <p>{truncateString(productData.title, 31)}</p>
//                                                     </div>
//                                                     <div className='chekout-item-quantity'>
//                                                         <p className='checkout-bill-font'>{productQuantity} × <span>₹{productData.price}</span></p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className='chekout-item-contiant'>
//                                             <p>No product selected. Please go back and select a product.</p>
//                                         </div>
//                                     )}
                                            
//                                     <div className='chekout-bill'>
//                                         <div className='checkout-bill-price'>
//                                             <p className='checkout-bill-font'>Sub-total</p>
//                                             <p>₹{orderSummary.subtotal.toFixed(2)}</p>
//                                         </div>
//                                         <div className='checkout-bill-price'>
//                                             <p className='checkout-bill-font'>Shipping</p>
//                                             <p>{orderSummary.shipping > 0 ? ₹${orderSummary.shipping.toFixed(2)} : 'Free'}</p>
//                                         </div>
//                                         <div className='checkout-bill-price'>
//                                             <p className='checkout-bill-font'>Discount</p>
//                                             <p>₹{orderSummary.discount.toFixed(2)}</p>
//                                         </div>
//                                         <div className='checkout-bill-price checkout-bill-border'>
//                                             <p className='checkout-bill-font'>Tax</p>
//                                             <p>₹{orderSummary.tax.toFixed(2)}</p>
//                                         </div>
//                                         <div className='checkout-bill-total'>
//                                             <p>Total</p>
//                                             <p>₹{orderSummary.total.toFixed(2)}</p>
//                                         </div>
//                                     </div>
//                                     <div className="chekout-product-button">
//                                         <button type="submit">Place Order</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default CheckOut




















































import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/checkout.css"
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useParams } from "react-router-dom";

function CheckOut() {
    // const { product_id } = useParams(); // Extract `id` from URL parameters
    const { id } = useParams(); // Get product ID from URL

    const [editproducts, setEditProducts] = useState({
           title: "",
           price: "",
           discount: "",
           tax: "",
           memory: "",
           size: "",
           storage: "",
           img: null,
           description: "",
           status: "",
           created_by: "",
           updated_by: "",
       });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:4800/getproductbyid/${id}`);
                setEditProducts(res.data[0]);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);
    

    const location = useLocation();
    const navigate = useNavigate();

    const [editdata, setEditdata] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        contact: "",
        address: "",
        img: null
    });
    const [error, setError] = useState(null);

    const userId = location.state?.user_id || localStorage.getItem("user_id");

    const fetchdatabyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4800/getuserbyid/${id}`);
            setEditdata(response.data[0])
        } catch (error) {
            console.error(error);
        }
    }


    // useEffect(  () => ) {
    //     try {
    //         const res = await axios.get(`http://localhost:4800/getproductbyid/${id}`)
    //         seteditproducts(res.data[0])
    //     }

    //     catch (error) {
    //         console.error(error);

    //     }
    // }, [id]);







    // const fetchproductsbyid = async (id) => {
    //     try {
    //         const res = await axios.get(`http://localhost:4800/getproductbyid/${id}`)
    //         seteditproducts(res.data[0])
    //     }

    //     catch (error) {
    //         console.error(error);

    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditdata((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("first_name", editdata.first_name);
            formdata.append("last_name", editdata.last_name);
            formdata.append("username", editdata.username);
            formdata.append("email", editdata.email);
            formdata.append("contact", editdata.contact);
            formdata.append("address", editdata.address);

            await axios.put(`http://localhost:4800/updatedata/${userId}`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setEditdata({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                contact: "",
                address: ""
            });
            navigate("/user");
        } catch (error) {
            setError("Error updating user data. Please try again.");
        }
    };




    useEffect(() => {
        if (userId) {
            fetchdatabyid(userId);
        } else {
            navigate("/login");
        }
    }, [userId]);

    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    };



    const handlePayment = async (amount) => {
        if (!amount) {
          alert("Invalid product amount!");
          return;
        }
      
        const product_id = id; // Product ID from useParams
      
        const response = await fetch("http://localhost:3000/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id, user_id: 1, amount }), // Send actual product amount
        });
      
        const { order } = await response.json();
      
        const options = {
          key: 'rzp_test_t5QTURwhUmX9Dk',
          amount: order.amount, // Amount in paise (already multiplied by 100 in backend)
          currency: "INR",
          name: "Your Shop",
          description: "Test Transaction",
          order_id: order.id,
          handler: function (response) {
            alert("Payment Successful! Your order is placed.");
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
        };
      
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };



    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='checkOut'>
                    <form>
                        <div className='checkOut-section'>
                            <div className='chekout-address'>
                                <div className='chekout-address-section'>
                                    <div className='chekout-address-heading'>
                                        <p>Billing Information</p>
                                    </div>
                                    <div className='chekout-address-information'>
                                        <div className='chekout-name-section'>
                                            <div className='chekout-name'>
                                                <div className='div'>
                                                    <label>User Name</label>
                                                </div>
                                                <div className='checkout-names'>
                                                    <input
                                                        type="text"
                                                        placeholder='First name'
                                                        id="firstName"
                                                        name="first_name"
                                                        value={editdata.first_name || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <input type='text' placeholder='Last name'  id="lastName" name="last_name" value={editdata.last_name || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='chekout-compnay-name'>
                                                <div className='div'>
                                                    <label>Compnay Name <span className='optional'>(Optional)</span></label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Compnay Name' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-address'>
                                            <div className='checkout-address-section'>
                                                <div className='div'>
                                                    <label>Address</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Address'  id="address" name="address" value={editdata.address || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='checkout-zipcode'>
                                                <div className='div'>
                                                    <label>Zip Code</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.123456' required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-conatct'>
                                            <div className='checkout-email checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Email</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='example.@gmail.com' id="email" name="email" value={editdata.email || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='checkout-number checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Phone Number</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.1234567890' value={editdata.contact || ""} id="contact" name="contact" onChange={handleChange} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-payment-section'>
                                    <div className='payment-section'>
                                        <div className='payment-section-heading'>
                                            <p>Payment Option</p>
                                        </div>
                                        <div className='payment-type-section'>
                                            <div className='payment-type'>
                                                <i class="fa-solid fa-hand-holding-dollar"></i>
                                                <p>Cash on Delivery</p>
                                                <input type='radio' required />
                                            </div>
                                            <div className='payment-type payment'>
                                                <i class="fa-solid fa-credit-card"></i>
                                                <p>Online Payment</p>
                                                <input type='radio' required />
                                            </div>
                                            <div className='payment-type'>
                                                <i class="fa-brands fa-google-wallet"></i>
                                                <p>My Wallet</p>
                                                <input type='radio' required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-additionl-section'>
                                    <div className='additionl-section-heading'>
                                        <p>Additional Information</p>
                                    </div>
                                    <div className='div'>
                                        <label>Order Notes <span className='optional'>(Optional)</span></label>
                                    </div>
                                    <div className='div'>
                                        <textarea type='text' placeholder='Notes about your order, e.g. special notes for delivery' />
                                    </div>
                                </div>
                            </div>
                            <div className='chekout-product'>
                                <div className='chekout-product-section'>
                                    <div className='chekout-product-heading'>
                                        <p>Order Summery</p>
                                    </div>
                                    <div className='chekout-item-contiant'>
                                        <div className='chekout-item'>
                                            <div className='chekout-item-img-section'>
                                                <div className='chekout-item-img'>
                                                    <img src={require("../../assets/images/item1.png")} alt='' />
                                                </div>
                                            </div>
                                            <div className='chekout-item-section'>
                                                <div className='chekout-item-name'>
                                                    <p>{truncateString("2020 Apple MacBook Pro with Apple M1 Chip (14-inch, 16GB RAM, 1TB SSD Storage) - Space Gray", 31)}</p>
                                                </div>
                                                <div className='chekout-item-quantity'>
                                                    <p className='checkout-bill-font'>1 × <span>₹120000</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='chekout-bill'>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Sub-total</p>
                                            <p>₹1,20,000</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Shipping</p>
                                            <p>Free</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Discount</p>
                                            <p>₹19,000</p>
                                        </div>
                                        <div className='checkout-bill-price checkout-bill-border'>
                                            <p className='checkout-bill-font'>Tax</p>
                                            <p>₹7,429</p>
                                        </div>
                                        <div className='checkout-bill-total'>
                                            <p>Total</p>
                                            <p>₹1,06,429</p>
                                        </div>
                                    </div>
                                    <div className="chekout-product-button">
                                        {/* <button>Place Order</button> */}
                                        <button
              className="buy-now"
              onClick={() => handlePayment(editproducts.price)}
            >
              Buy Now
            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckOut