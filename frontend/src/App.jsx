import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Doctors from './pages/Doctors'
import Login from './pages/Login'
// import About from './pages/PatientDash'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientDash from './pages/PatientDash'
import Report from './pages/Report'
import Store from './pages/Store'
import MyReports from './pages/MyReports'

const rewards = [
  {
    title: 'Free Annual Wellness Checkup',
    description: 'Get a comprehensive annual checkup to stay on top of your health.',
    bgImage: '/1.checkup.jpg',
    rewardAmount: 0,
  },
  {
    title: 'Discount on Prescription Glasses',
    description: 'Receive 20% off on prescription glasses from our partner optometrist.',
    bgImage: '/2.glasses.jpg',
    rewardAmount: 50,
  },
  {
    title: 'Free Flu Vaccination',
    description: 'Protect yourself and your family from the flu with a free vaccination.',
    bgImage: '3.Flu-vaccine.jpeg',
    rewardAmount: 75,
  },
  {
    title: 'Discount on Dental Cleaning and Checkup',
    description: 'Get 30% off on your next dental cleaning and checkup appointment.',
    bgImage: '/4.dental.jpg',
    rewardAmount: 100,
  },
  {
    title: 'Free Fitness Tracker',
    description: 'Monitor your activity and health metrics with a free fitness tracker.',
    bgImage: '/fitness-track.png',
    rewardAmount: 150,
  },
  {
    title: 'Discount on Telehealth Consultation',
    description: 'Receive 25% off on your next virtual consultation with a healthcare provider.',
    bgImage: '/telehealth.jpg',
    rewardAmount: 75,
  },
  {
    title: 'Discount on Compression Socks',
    description: 'Receive 15% off on a pair of high-quality compression socks.',
    bgImage: '/socks.jpg',
    rewardAmount: 25,
  },
  {
    title: 'Coupon for Free Massage Session',
    description: 'Enjoy a complimentary 60-minute massage session at our partner spa.',
    bgImage: '/massage.jpg',
    rewardAmount: 150,
  },
];

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/report' element={<Report />} />
        <Route path='/login' element={<Login />} />
        <Route path='/patientdash' element={<PatientDash />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-reports' element={<MyReports />} />
        <Route path='/store' element={<Store rewards={rewards}/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App