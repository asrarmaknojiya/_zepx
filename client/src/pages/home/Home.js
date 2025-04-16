import React from 'react'
import Navbar from '../navbar/Navbar'
import Banner from './Banner'
import Category from './Category'
// import MobileBanner from './MobileBanner'
import MobileSection from './MobileSection'
import WatchBanner from './WatchBanner'
import Footer from '../footer/Footer'
import FeedBack from './FeedBack'
import FAQSection from './Faq'
import Review from './Review'
import Offer from './Offer'
import { ToastContainer } from 'react-toastify'

function Home() {
  return (
    <div>
      <Navbar/>
      <ToastContainer autoClose={2000}/>

      <Banner/>
      <Category/>
      {/* <MobileBanner/> */}
      <MobileSection/>
      <WatchBanner/>
      <Offer/>
      <FAQSection/>
      {/* <Review/> */}
      <FeedBack/>
      <Footer/>

    </div>
  )
}

export default Home
