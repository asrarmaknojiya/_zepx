// import React from 'react'
import '../../assets/css/orders.css'
import React, { useEffect, useState } from 'react';
import { Package, Truck, Handshake, FileText } from 'lucide-react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Orders() {

    const [progress, setProgress] = useState(0); // 0 to 100
    const orderStatus = 80; // Change this to control product status (25, 50, 75, 100)
    //  const [filteredorder, setFilteredorder] = useState([]);
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    // const [fetchorder, setFetchorder] = useState([]);

    const port = process.env.REACT_APP_URL;



    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${port}/getorderbyid/${id}`);
                console.log("Fetched order:", res.data);
                setOrderData(res.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchOrder();
    }, [id]);



    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < orderStatus) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 25); // Speed of fill
        return () => clearInterval(interval);
    }, []);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 629);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 629);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <Navbar />
            <div className='orders-container'>
                <div className='main-orders'>
                    <div className='header-orders'>
                        <div className='para-header'>
                            <i class="fa-solid fa-arrow-left"></i><p>ORDER DETAILS</p>
                        </div>
                    </div>
                    <div className='horizontal-line'></div>
                    <div className='id-orders'>
                        <div className='sec1-id'>
                            <div className='sub1-sec1'>
                                {/* <p>#96459761</p> */}
                                <p>#{orderData?.order_id}</p>
                            </div>
                            <div className='sub2-sec1'>
                                {/* <p>4 Products . Order Placed in 17 Jan, 2021 at 7:32 P</p> */}
                                {/* <p>{orderData?.items.length} Products • Order Placed on {orderData?.order_date}</p> */}
                                {/* <p>Order Placed on {orderData?.order_date}</p> */}
                                <p>
                                    {orderData?.items?.length
                                        ? `${orderData.items.length} Products`
                                        : 'Order'} • Order Placed on {orderData?.order_date}
                                </p>

                            </div>
                        </div>
                        <div className='sec2-id'>
                            {/* <p>$1199.00</p> */}
                            <p>${orderData?.total_amount}</p>

                        </div>
                    </div>
                    <div className='dilvery-orders'>
                        <div><p>Order expected arrival <b>23 Jan, 2021</b></p></div>
                        <div className="tracking-container">
                            <div className="progress-line-container">
                                <div className="progress-line-background"></div>
                                {/* <div
                                    className="progress-line-fill"
                                    style={`isMobile ? { height: ${progress}% } : { width: ${progress}% }`}
                                ></div> */}
                                <div
                                    className="progress-line-fill"
                                    style={isMobile ? { height: `${progress}%` } : { width: `${progress}%` }}
                                ></div>

                                <div className={`dot ${progress >= 0 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 33 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 66 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 100 ? 'active' : ''}`}></div>
                            </div>
                            <div className="status-labels">
                                <div>
                                    <FileText color="green" size={30} />
                                    <p>Order Placed</p>
                                </div>
                                <div>
                                    <Package color="#3c5fff" size={30} />
                                    <p>Packaging</p>
                                </div>
                                <div>
                                    <Truck color="grey" size={30} />
                                    <p>On The Road</p>
                                </div>
                                <div>
                                    <Handshake color="#3c5fff" size={30} />
                                    <p>Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='horizontal-line'></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders